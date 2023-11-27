import React, {useState} from 'react';
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

    // Search paramters
    const [origin, setOrigin] = useState('Chicago');
    const [destination, setDestination] = useState('Calgary');
    const [date, setDate] = useState('2023-12-20');
    const [guests, setGuests] = useState('2');
    const [flightId, setFlightId] = useState('');



    return (
        <div>
            <Navbar/>
            <Switch>
                <Route path='/' exact>
                    <Redirect to='/search'/>
                </Route>
                <Route path='/login'>
                    <LoginPage/>
                </Route>
                <Route path='/search'>
                    <SearchPage setOrigin={setOrigin} setDestination={setDestination}
                                setDate={setDate} setGuests={setGuests}/>
                </Route>
                <Route path='/flights'>
                    <FlightsPage origin={origin} destination={destination} date={date} setFlightId={setFlightId}/>
                </Route>
                <Route path='/seats'>
                    <SeatPage flightId={flightId}/>
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
