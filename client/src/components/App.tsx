import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import AppProvider from '../context/Context';
import Header from './Header';
import JobList from './JobList';
import EsriMapView from './EsriMapView';

const App = () => {
    return (
        <Router>
            <AppProvider>
                <Header />
                <Switch>
                    <Route exact path="/">
                        <JobList />
                    </Route>
                    <Route path="/map">
                        <EsriMapView />
                    </Route>
                </Switch>
            </AppProvider>
        </Router>
    );
}

export default App;