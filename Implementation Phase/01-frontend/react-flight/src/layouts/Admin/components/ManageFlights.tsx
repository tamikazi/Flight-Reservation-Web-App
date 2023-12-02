import React, {useState} from "react";
import FlightView from "../../../models/FlightView";
import FlightRequestView from "../../../models/FlightRequestView";

export const ManageFlights = () => {

    const [flightId, setFlightId] = useState('');
    const [code, setCode] = useState('');
    const [date, setDate] = useState('');
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [aircraftId, setAircraftId] = useState('');
    const [time, setTime] = useState('');
    const [price, setPrice] = useState(0);

    // Displays
    const [displayGetWarning, setDisplayGetWarning] = useState(false);
    const [displayDeleteWarning, setDisplayDeleteWarning] = useState(false);
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displayFailure, setDisplayFailure] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    const fetchFlight = async () => {
        const url: string = `http://localhost:8080/api/admin/flights/${code}/${date}`;

        const response = await fetch(url);

        if (!response.ok) {
            setDisplayFailure(true);
            return;
        }

        const responseData = await response.json();

        if (!responseData) {
            setDisplayFailure(true);
            return;
        }

        setFlightId(responseData.flightID);
        setCode(responseData.code);
        setDate(responseData.date);
        setTime(responseData.time);
        setOrigin(responseData.origin);
        setDestination(responseData.destination);
        setAircraftId(responseData.aircraftID);
        setPrice(responseData.basePrice);

    };

    async function addFlight() {
        try {
            const url = `http://localhost:8080/api/admin/flights/add`;

            const userRequest = new FlightRequestView(
                code,
                origin,
                destination,
                date,
                time,
                aircraftId,
                price
            );

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userRequest)
            };

            const updateResponse = await fetch(url, requestOptions);

            if(!updateResponse.ok) {
                setDisplayFailure(true);
                return;
            } else {
                setDisplayFailure(false);
                setDisplaySuccess(true);
            }
        } catch (error) {
            setDisplayFailure(true);
        }
    }

    async function updateFlight() {
        try {
            const url = `http://localhost:8080/api/admin/flights/update`;

            const userRequest = new FlightView(
                flightId,
                code,
                origin,
                destination,
                date,
                time,
                aircraftId,
                price
            );

            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userRequest)
            };

            const updateResponse = await fetch(url, requestOptions);

            if(!updateResponse.ok) {
                setDisplayFailure(true);
                return;
            } else {
                setDisplayFailure(false);
                setDisplaySuccess(true);
            }
        } catch (error) {
            setDisplayFailure(true);
        }
    }

    async function deleteFlight() {
        const url = `http://localhost:8080/api/admin/flights/delete/${flightId}`;
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const updateResponse = await fetch(url, requestOptions);

        if(!updateResponse.ok) {
            setDisplayFailure(true);
            return;
        } else {
            setDisplayFailure(false);
            setDisplaySuccess(true);
        }
    }

    const getHandle = () => {
        setDisplayWarning(false);
        setDisplayFailure(false);
        setDisplaySuccess(false);
        setDisplayGetWarning(false);

        // Check fields filled in
        if(code !== '' && date !== '') {
            fetchFlight();
        } else {
            setDisplayGetWarning(true);
        }
    }

    const addHandle = async () => {
        setDisplayWarning(false);
        setDisplayFailure(false);
        setDisplaySuccess(false);
        setDisplayGetWarning(false);

        // Check fields filled in
        if (code !== '' && aircraftId !== '' && price !== 0 && origin !== '' && destination !== '' &&
            date !== '' && time !== '') {
            addFlight();
        } else {
            setDisplayGetWarning(true);
        }
    }

    const updateHandle = async () => {
        setDisplayWarning(false);
        setDisplayFailure(false);
        setDisplaySuccess(false);
        setDisplayGetWarning(false);

        // Check fields filled in
        if (code !== '' && aircraftId !== '' && price !== 0 && origin !== '' && destination !== '' &&
            date !== '' && time !== '' && flightId !== '') {
            updateFlight();
        } else {
            setDisplayGetWarning(true);
        }
    }

    const deleteHandle = () => {
        setDisplayDeleteWarning(false);
        setDisplayWarning(false);
        setDisplayFailure(false);
        setDisplaySuccess(false);
        setDisplayGetWarning(false);

        // Check flight has been pulled previously
        if(flightId !== '') {
            deleteFlight();
        } else {
            setDisplayDeleteWarning(false);
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
                            <div className='col-3'>
                                <label htmlFor='id' className='form-label'>Flight ID</label>
                                <input type='text' className='form-control' id='id' value={flightId}
                                       onChange={(e) => setFlightId(e.target.value)}/>
                            </div>
                            <div className='col-3'>
                                <label htmlFor='code' className='form-label'>Flight Code</label>
                                <input type='text' className='form-control' id='code' value={code}
                                       onChange={(e) => setCode(e.target.value)}/>
                            </div>
                            <div className='col-3'>
                                <label htmlFor='aircraft' className='form-label'>Aircraft ID</label>
                                <input type='text' className='form-control' id='aircraft' value={aircraftId}
                                       onChange={(e) => setAircraftId(e.target.value)}/>
                            </div>
                            <div className='col-3'>
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
                                <button className='btn btn-primary flex-fill mx-5' type='button' onClick={addHandle}>
                                    Add
                                </button>
                                <button className='btn btn-primary flex-fill mx-5' type='button' onClick={updateHandle}>
                                    Update
                                </button>
                                <button className='btn btn-primary flex-fill mx-5' type='button' onClick={deleteHandle}>
                                    Delete Flight
                                </button>
                            </div>
                            <div className='col-12'>

                                <p>Get Flight searches by Flight Code and Departure Date</p>
                                <p>Add will assign a Flight ID automatically. Fill in all other fields.</p>
                                <p>Update will edit the flight with the specified Flight ID. Fill in all fields.</p>
                                <p>Delete will remove the flight with the specified Flight ID.</p>
                            </div>
                            {displayWarning &&
                                <div className='alert alert-danger' role='alert'>
                                    All fields must be filled in
                                </div>
                            }
                            {displayGetWarning &&
                                <div className='alert alert-danger' role='alert'>
                                    Flight code and Date must be specified
                                </div>
                            }
                            {displayFailure &&
                                <div className='alert alert-danger' role='alert'>
                                    Server transaction failed. Check fields.
                                </div>
                            }
                            {displayDeleteWarning &&
                                <div className='alert alert-danger' role='alert'>
                                    Get flight first.
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