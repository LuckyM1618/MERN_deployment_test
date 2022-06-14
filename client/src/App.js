import './App.css';
import React, { useState } from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";

import AllNinjas from './components/AllNinjas';
import NewNinja from './components/NewNinja';
import OneNinja from './components/OneNinja';
import EditNinja from './components/EditNinja';

function App() {
    const [ newNinjaToggle, setNewNinjaToggle ] = useState(false);

    const ninjaAdded = () => {
        setNewNinjaToggle(!newNinjaToggle);
    }

    return (
        <BrowserRouter>
            <div className="App">
                <h1>We have assumed control</h1>
                <Link to = "/new">Add Ninja</Link>
                <br></br>
                <Link to = "/">Home</Link>
                <Switch>
                    <Route exact path = "/">
                        <AllNinjas newNinjaToggle = { newNinjaToggle } />
                    </Route>

                    <Route exact path = "/new">
                        <NewNinja ninjaAdded = {ninjaAdded} />
                    </Route>

                    <Route exact path = "/ninjas/:id">
                        <OneNinja />
                    </Route>

                    <Route exact path = "/edit/:id">
                        <EditNinja />
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
