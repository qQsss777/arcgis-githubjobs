import MapView from 'esri/views/MapView';
import Map from 'esri/Map';
import GeoJSONLayer from 'esri/layers/GeoJSONLayer';
import Locator from "esri/tasks/Locator";

import { GitHubResult, GeoJSON, Features, GeometryPointJSON } from '../interfaces';

let geojsonlayer: GeoJSONLayer;

const extent = {
    xmin: -6402610.923685171,
    xmax: 7881940.92224477,
    ymin: 3816716.025356518,
    ymax: 8102081.5791355,
    spatialReference: {
        wkid: 3857
    }
}

export const locator = new Locator({
    url: "VOTRE_URL"
});

export const map = new Map({
    basemap: {
        portalItem: {
            id: "8d91bd39e873417ea21673e0fee87604"  // WGS84 Streets Vector webmap
        }
    }
});

export const mapview = new MapView({
    map,
    extent,
});


export const loadMap = async (node: HTMLDivElement, data: GitHubResult[]): Promise<MapView> => {
    if (!geojsonlayer && data.length > 0) {
        //set container to map view
        const geojson = await createGeoJson(data);
        const blob = new Blob([JSON.stringify(geojson)], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        //get symbology
        const renderer: Features = Object.assign(require('../templates/Renderer.json'));

        //init GeoJSON Layer
        geojsonlayer = new GeoJSONLayer({
            url,
            renderer,
        });

        geojsonlayer.featureReduction = {
            type: "cluster",
            clusterRadius: "100px",
            popupTemplate: {
                // cluster_count is an aggregate field indicating the number
                // of features summarized by the cluster
                content: "This cluster represents {cluster_count} jobs."
            }
        }

        map.add(geojsonlayer);
    } else if (data.length === 0) {
        alert('pas de donnée')
    }

    mapview.container = node;
    return mapview;
}

const createGeoJson = async (data: GitHubResult[]): Promise<GeoJSON> => {
    //get template
    const geojsonSource: GeoJSON = Object.assign(require('../templates/GeoJSONLayer.json'));
    const geojson: GeoJSON = JSON.parse(JSON.stringify(geojsonSource));

    //format features
    const features = await formatFeature(data);
    geojson.features = features;
    return geojson;
}

const formatFeature = async (data: GitHubResult[]): Promise<Features[]> => {
    //for each row geocode from location field et push the result in features
    let features: Features[] = [];

    for (let index: number = 0; index < data.length; index++) {
        const featureSource: Features = Object.assign(require('../templates/GeoJSONLayer.json'));
        const feature: Features = JSON.parse(JSON.stringify(featureSource));

        const address = {
            "singleLine": data[index].location
        };
        //run locator task
        const results = await locator.addressToLocations({ address, })
        if (results.length > 0) {
            //set attributes  feature
            feature.properties = data[index];

            //add geometry
            const geometry: GeometryPointJSON = {
                type: "Point",
                coordinates: [results[0].location.longitude, results[0].location.latitude]
            };
            feature.geometry = geometry;
            features.push(feature);
        }
    }
    return features;
}