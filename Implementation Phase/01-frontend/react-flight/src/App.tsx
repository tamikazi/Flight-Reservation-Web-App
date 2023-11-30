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
import CheckoutSeatModel from "./models/CheckoutSeatModel";
import {NamesPage} from "./layouts/Names/NamesPage";
import CurrentUserContext, {CurrentUserContextType, defaultUser, Roles} from "./contexts/CurrentUserContext";

function App() {
    // User login state, default to Guest
    const [currentUser, setCurrentUser] = useState<CurrentUserContextType>(defaultUser);

    // Order information
    const [origin, setOrigin] = useState('Chicago');
    const [destination, setDestination] = useState('Calgary');
    const [date, setDate] = useState('2023-12-20');
    const [checkoutFlightId, setCheckoutFlightId] = useState('');
    const [numGuests, setNumGuests] = useState(3);
    const [guestNames, setGuestNames] = useState<string[]>([]);
    const [checkoutSeatIds, setCheckoutSeatIds] = useState<string[]>([]);
    const [checkoutSeats, setCheckoutSeats] = useState<CheckoutSeatModel[]>([]);
    const [checkoutCost, setCheckoutCost] = useState(0);
    const [checkoutInsurance, setCheckoutInsurance] = useState(false);


    return (
        <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
            <div>
                <Navbar/>
                <Switch>
                    <Route path='/' exact>
                        <Redirect to='/search'/>
                    </Route>
                    <Route path='/login'>
                        <LoginPage />
                    </Route>
                    <Route path='/search'>
                        <SearchPage setOrigin={setOrigin} setDestination={setDestination}
                                    setDate={setDate} setGuests={setNumGuests}/>
                    </Route>
                    <Route path='/flights'>
                        <FlightsPage origin={origin} destination={destination} date={date}
                                     setCheckoutFlightId={setCheckoutFlightId}/>
                    </Route>
                    <Route path='/seats'>
                        <SeatPage checkoutFlightId={checkoutFlightId}
                                  numGuests={numGuests}
                                  setCheckoutCost={setCheckoutCost}
                                  setCheckoutSeats={setCheckoutSeats}
                                  setCheckoutInsurance={setCheckoutInsurance}/>
                    </Route>
                    <Route path='/names'>
                        <NamesPage checkoutSeats={checkoutSeats} setCheckoutSeats={setCheckoutSeats}/>
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
        </CurrentUserContext.Provider>
    );
}

export default App;
