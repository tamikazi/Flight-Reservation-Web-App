import {Passenger} from "../../Manifest/components/Passenger";
import React, {useEffect, useState} from "react";
import FlightModel from "../../../models/FlightModel";
import {SpinnerLoading} from "../../Utils/SpinnerLoading";
import {Flight} from "../../Flights/components/Flight";
import AircraftModel from "../../../models/AircraftModel";

export const ManageFlights = () => {

    const [flight, setFlight] = useState<FlightModel>();
    const [flightId, setFlightId] = useState('');
    const [code, setCode] = useState('');
    const [date, setDate] = useState('');
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [aircraftId, setAircraftId] = useState('');
    const [time, setTime] = useState('');
    const [price, setPrice] = useState(0);

    // Displays
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displayFailure, setDisplayFailure] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    const fetchFlight = async () => {
        const url: string = "http://localhost:8080/api/admin/flights/id/1";

        const response = await fetch(url);

        if (!response.ok) {
            setDisplayFailure(true);
            return;
        }

        const responseData = await response.json();

        setFlightId(responseData.flightID);
        setCode(responseData.code);
        setDate(responseData.date);
        setTime(responseData.time);
        setOrigin(responseData.origin);
        setDestination(responseData.destination);
        setAircraftId(responseData.aircraftID);
        setPrice(responseData.basePrice);

    };

    const addFlight = async () => {

    }

    const getHandle = () => {
        setDisplayWarning(false);
        setDisplayFailure(false);
        setDisplaySuccess(false);
        if(code !== '' && date !== '') {
            fetchFlight();
        } else {
            setDisplayWarning(true);
        }
    }


    return (
        <div className='container mt-5 mb-5'>
            <div className='card'>
                <div className='card-header'>
                    Manage flights
                </div>
                <div className='card-body'>
                    <form>
                        <div className='row g-3'>
                            <div className='col-4'>
                                <label htmlFor='code' className='form-label'>Flight Code</label>
                                <input type='text' className='form-control' id='code' value={code}
                                       onChange={(e) => setCode(e.target.value)}/>
                            </div>
                            <div className='col-4'>
                                <label htmlFor='aircraft' className='form-label'>Aircraft Model</label>
                                <input type='text' className='form-control' id='aircraft' value={aircraftId}
                                       onChange={(e) => setAircraftId(e.target.value)}/>
                            </div>
                            <div className='col-4'>
                                <label htmlFor='price' className='form-label'>Base Price</label>
                                <input type='number' className='form-control' id='price' value={price}
                                       onChange={(e) => setPrice(Number(e.target.value))}/>
                            </div>
                            <div className='col-6'>
                                <label htmlFor='origin' className='form-label'>Origin</label>
                                <input type='text' className='form-control' id='origin' value={origin}
                                       onChange={(e) => setOrigin(e.target.value)}/>
                            </div>
                            <div className='col-6'>
                                <label htmlFor='destination' className='form-label'>Destination</label>
                                <input type='text' className='form-control' id='destination' value={destination}
                                       onChange={(e) => setDestination(e.target.value)}/>
                            </div>
                            <div className='col-6'>
                                <label htmlFor='date' className='form-label'>Departure Date</label>
                                <input type='date' className='form-control' id='date' value={date}
                                       onChange={(e) => setDate(e.target.value)}/>
                            </div>
                            <div className='col-6'>
                                <label htmlFor='time' className='form-label'>Departure Time</label>
                                <input type='time' className='form-control' id='time' value={time}
                                       onChange={(e) => setTime(e.target.value)}/>
                            </div>
                            <div className='col d-flex'>
                                <button className='btn btn-primary flex-fill mx-5' type='button' onClick={getHandle}>
                                    Get Flight
                                </button>
                                <button className='btn btn-primary flex-fill mx-5' type='button'>
                                    Add
                                </button>
                                <button className='btn btn-primary flex-fill mx-5' type='button'>
                                    Update
                                </button>
                                <button className='btn btn-primary flex-fill mx-5' type='button'>
                                    Delete Flight
                                </button>
                            </div>
                            {displayWarning &&
                                <div className='alert alert-danger' role='alert'>
                                    All fields must be filled in
                                </div>
                            }
                            {displayFailure &&
                                <div className='alert alert-danger' role='alert'>
                                    Server transaction failed
                                </div>
                            }
                            {displaySuccess &&
                                <div className='alert alert-success' role='alert'>
                                    Success
                                </div>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};