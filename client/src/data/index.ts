import MapView from 'esri/views/MapView';
import Map from 'esri/Map';
import GeoJSONLayer from 'esri/layers/GeoJSONLayer';
import Locator from "esri/tasks/Locator";

import { GitHubResult, GeoJSON, Features, GeometryPointJSON } from '../interfaces';

let geojsonlayer: GeoJSONLayer;

export const locator = new Locator({
    url: "VOTRE_URL"
});

export const map = new Map({
    basemap: 'topo'
});

export const mapview = new MapView({
    map,
});

export const loadMap = async (node: HTMLDivElement, data: GitHubResult[]): Promise<MapView> => {

    if (geojsonlayer) {
        map.remove(geojsonlayer);
        geojsonlayer.destroy();
    }

    //set container to map view
    mapview.container = node;

    const geojson = await createGeoJson(data);
    const blob = new Blob([JSON.stringify(geojson)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    geojsonlayer = new GeoJSONLayer({
        url,
    })
    map.add(geojsonlayer);

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