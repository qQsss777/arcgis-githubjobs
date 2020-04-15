import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../hooks/useStylesApp';
import { Button } from '@material-ui/core';
import ButtonTri from './ButtonTri';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    //use styles
    const classes = useStyles();

    //use state
    const initialState = {
        route: '/map',
        title: 'Afficher la carte',
        disabled: false
    };
    const [route, setRoute] = useState(initialState);

    //handle click button
    const handleClick = (event: any) => {
        if (route.route === '/map') {
            setRoute({ route: '/', title: 'Afficher la liste', disabled: true })
        } else {
            setRoute({ route: '/map', title: 'Afficher la carte', disabled: false })
        }
    }
    return (
        //fix the app bar (not working in IE 11)
        <AppBar position="sticky" className={classes.header}>
            <Toolbar>
                <Typography variant="h6" className={classes.header_title}>
                    GitHub jobs in Europe
                </Typography>
                <ButtonTri disabled={route.disabled} />
                <Button color="inherit" component={Link} to={route.route} onClick={handleClick}>{route.title}</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;