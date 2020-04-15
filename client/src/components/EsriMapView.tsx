import React, { useContext, useRef, useEffect } from "react";
import { AppContext } from "../context/Context";
import { useStyles } from "../hooks/useStylesApp";
import MapView from "esri/views/MapView";
import { GitHubResult } from "../interfaces";

const loadModule = async (node: HTMLDivElement, data: GitHubResult[]): Promise<MapView> => {
    const mod = await import('../data');
    return await mod.loadMap(node, data)
};

const EsriMapView = () => {

    //use ref for attache map to div element
    const node = useRef({} as HTMLDivElement);

    //use style
    const classes = useStyles();

    //use context
    const { state } = useContext(AppContext);

    useEffect(() => {
        let mapView: MapView;
        loadModule(node.current, state.data)
            .then(view => mapView = view)
            .catch(err => console.log('err'))
        // Specify how to clean up after this effect:
        return function cleanup() {
            mapView ? mapView.container = null : {};
        };
    }, [])

    return (
        <div className={classes.mapping_root} ref={node} />
    );
}

export default EsriMapView;