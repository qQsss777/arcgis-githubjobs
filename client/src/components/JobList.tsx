import React, { useEffect, useContext } from 'react';
import Job from './Job';
import { useStyles } from '../hooks/useStylesApp';
import { Grid } from '@material-ui/core';
import { AppContext } from '../context/Context';
import { SET_DATA } from '../actions';

const JobList = () => {

    //use style (force max width and with to 100%)
    const classes = useStyles();

    //use context
    const { state, dispatch } = useContext(AppContext);

    //useEffect for fetching data with an IIFE 
    useEffect(() => {
        (async function fetchData() {
            const response = await fetch('http://localhost:8000');
            const json = await response.json();
            dispatch({ type: SET_DATA, payload: { data: json } });
        })();
    }, []);

    //useEffect for sorted data
    useEffect(() => {
        const data = state.data;
        if (data.length > 0) {
            switch (state.value) {
                case 'asc':
                    data.sort((a, b) => (a.company > b.company) ? 1 : -1)
                    dispatch({ type: SET_DATA, payload: { data, } });
                    break;
                case 'dsc':
                    data.sort((a, b) => (a.company < b.company) ? 1 : -1)
                    dispatch({ type: SET_DATA, payload: { data, } });
                    break;
                case 'date':
                    data.sort((a, b) => (+new Date(a.created_at) < +new Date(b.created_at)) ? 1 : -1);
                    dispatch({ type: SET_DATA, payload: { data, } });
                    break;
            }
        }
    }, [state.value]);

    return (
        <Grid container spacing={3} className={classes.list} >
            {
                state.data.map(job => <Job job={job} key={state.data.indexOf(job)} />)
            }
        </Grid >
    );
};

export default JobList;