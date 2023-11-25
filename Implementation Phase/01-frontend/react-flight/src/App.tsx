import React from 'react';
import './App.css';
import {Redirect, Route, Switch} from "react-router-dom";
import {Navbar} from "./layouts/Nav/Navbar";
import {FlightsPage} from "./layouts/Flights/FlightsPage";
import {AdminPage} from "./layouts/Admin/AdminPage";
import {ManifestPage} from "./layouts/Manifest/ManifestPage";
import {SeatPage} from "./layouts/Seat/SeatPage";
import {PaymentPage} from "./layouts/Payment/PaymentPage";
import {LoginPage} from "./layouts/Login/LoginPage";
import {SearchPage} from "./layouts/SearchFlights/SearchPage";

function App() {
    return (
        <div>
            <Navbar/>
            <Switch>
                <Route path='/' exact>
                    <Redirect to='/flights'/>
                </Route>
                <Route path='/login'>
                    <LoginPage/>
                </Route>
                <Route path='/search'>
                    <SearchPage/>
                </Route>
                <Route path='/flights'>
                    <FlightsPage/>
                </Route>
                <Route path='/seats/:flightId'>
                    <SeatPage/>
                </Route>
                <Route path='/payment'>
                    <PaymentPage/>
                </Route>
                <Route path='/manifest'>
                    <ManifestPage/>
                </Route>
                <Route path='/admin'>
                    <AdminPage/>
                </Route>
            </Switch>
        </div>
    );
}

export default App;
