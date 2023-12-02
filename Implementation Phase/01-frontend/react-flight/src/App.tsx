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
import CurrentUserContext, {CurrentUserContextType, defaultUser} from "./contexts/CurrentUserContext";
import {ManageBookingPage} from "./layouts/Bookings/ManageBookingPage";
import {PaymentHistoryPage} from "./layouts/PaymentHistory/PaymentHistoryPage";
import {ConfirmationPage} from "./layouts/PaymentConfirmation/ConfirmationPage";
import {CancelTicketPage} from "./layouts/CancelTicket/CancelTicketPage";
import {SignupPage} from "./layouts/Signup/SignupPage";

function App() {
    // User login state, default to Guest
    const [currentUser, setCurrentUser] = useState<CurrentUserContextType>(defaultUser);

    // Order information
    const [origin, setOrigin] = useState('Chicago');
    const [destination, setDestination] = useState('Calgary');
    const [date, setDate] = useState('2023-12-20');
    const [checkoutFlightId, setCheckoutFlightId] = useState('');
    const [numGuests, setNumGuests] = useState(3);
    const [checkoutSeats, setCheckoutSeats] = useState<CheckoutSeatModel[]>([]);
    const [checkoutCost, setCheckoutCost] = useState(0);
    const [checkoutInsurance, setCheckoutInsurance] = useState(false);


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div>
                <Navbar setUser={setCurrentUser}/>
                <Switch>
                    <Route path='/' exact>
                        <Redirect to='/search'/>
                    </Route>
                    <Route path='/login'>
                        <LoginPage setUser={setCurrentUser}/>
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
                        <PaymentPage checkoutFlightId={checkoutFlightId} checkoutSeats={checkoutSeats}
                                     checkoutCost={checkoutCost} checkoutInsurance={checkoutInsurance}/>
                    </Route>
                    <Route path='/confirm'>
                        <ConfirmationPage/>
                    </Route>
                    <Route path='/manifest'>
                        <ManifestPage/>
                    </Route>
                    <Route path='/admin'>
                        <AdminPage/>
                    </Route>
                    <Route path='/bookings'>
                        <ManageBookingPage/>
                    </Route>
                    <Route path='/history'>
                        <PaymentHistoryPage/>
                    </Route>
                    <Route path='/cancel'>
                        <CancelTicketPage/>
                    </Route>
                    <Route path='/signup'>
                        <SignupPage/>
                    </Route>
                </Switch>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
