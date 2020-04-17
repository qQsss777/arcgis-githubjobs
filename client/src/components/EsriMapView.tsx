import React, { useContext, useRef, useEffect, useState } from "react";
import { AppContext } from "../context/Context";
import { useStyles } from "../hooks/useStylesApp";
import MapView from "esri/views/MapView";
import { GitHubResult } from "../interfaces";
import Loader from "./Loader";

const loadModule = async (node: HTMLDivElement, data: GitHubResult[]): Promise<MapView> => {
    const mod = await import('../data');
    return await mod.loadMap(node, data)
};

const EsriMapView = () => {

    //use ref for attache map to div element
    const node = useRef({} as HTMLDivElement);

    //use state for loading.
    const [isLoading, setLoading] = useState(false)

    //use style
    const classes = useStyles();

    //use context
    const { state } = useContext(AppContext);

    useEffect(() => {
        let mapView: MapView;
        loadModule(node.current, state.data)
            .then(view => mapView = view)
            .then(_ => setLoading(true))
            .catch(err => console.log('erreur => ', err))
        // Specify how to clean up after this effect:
        return function cleanup() {
            mapView ? mapView.container = null : {};
        };
    }, [])

    return (
        <div className={classes.mapping_root}>
            < div className={classes.mapping_map} ref={node} />
            {!isLoading ? <Loader /> : null}
        </div>
    );
}

export default EsriMapView;