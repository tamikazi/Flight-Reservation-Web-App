import {useEffect, useState} from "react";
import FlightModel from "../../models/FlightModel";
import {SpinnerLoading} from "../Utils/SpinnerLoading";
import {Flight} from "./components/Flight";

export const FlightsPage = () => {

    const [flights, setFlights] = useState<FlightModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [searchUrl, setSearchUrl] = useState('');

    // Dropdown menus
    const [dateSelection, setDateSelection] = useState('Select a Date');
    const [dateSelected, setDateSelected] = useState(false);
    const [dateOptions, setDateOptions] = useState<Set<string>>(new Set<string>);
    const [originSelection, setOriginSelection] = useState('Select an Origin');
    const [originSelected, setOriginSelected] = useState(false);
    const [originOptions, setOriginOptions] = useState<Set<string>>(new Set<string>);
    const [destinationSelection, setDestinationSelection] = useState('Select a Destination');
    const [destinationSelected, setDestinationSelected] = useState(false);
    const [destinationOptions, setDestinationOptions] = useState<Set<string>>(new Set<string>);

    useEffect(() => {
        const fetchFlights = async () => {
            const baseUrl: string = "http://localhost:8080/api/flights";

            let url: string;

            if (searchUrl === '') {
                url = `${baseUrl}`;
            } else {
                url = `${baseUrl}${searchUrl}`;
            }

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseData = await response.json();

            const loadedFlights: FlightModel[] = [];

            for (const key in responseData) {
                loadedFlights.push({
                    flightID: responseData[key].flightID,
                    code: responseData[key].code,
                    origin: responseData[key].origin,
                    destination: responseData[key].destination,
                    date: responseData[key].date,
                    time: responseData[key].time,
                    aircraft: responseData[key].aircraft
                });
            }

            // // Fake data
            // const mockFlights: FlightModel[] = [];
            // mockFlights.push({
            //     flightId: 1,
            //     code: 'AB100',
            //     origin: 'Calgary',
            //     destination: 'Vancouver',
            //     date: '2023-11-30',
            //     aircraft: 'B787'
            // });
            // mockFlights.push({
            //     flightId: 2,
            //     code: 'AB101',
            //     origin: 'Calgary',
            //     destination: 'Edmonton',
            //     date: '2023-11-30',
            //     aircraft: 'B787'
            // });
            // mockFlights.push({
            //     flightId: 3,
            //     code: 'AB103',
            //     origin: 'Calgary',
            //     destination: 'Toronto',
            //     date: '2023-11-31',
            //     aircraft: 'B787'
            // });

            setFlights(loadedFlights);
            setIsLoading(false);
        };
        fetchFlights().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, [searchUrl]);

    if (isLoading) {
        return (
            <SpinnerLoading/>
        )
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}...</p>
            </div>
        )
    }

    const dateHandleDropdown = () => {
        // Only set dropdown options once, when all flights are loaded
        // TODO: update to filter flights
        // TODO: update to only show filtered flight dates
        if(dateOptions.size === 0) {
            const loadedDates = new Set<string>();
            for (const key in flights) {
                loadedDates.add(flights[key].date);
            }
            setDateOptions(loadedDates);
        }
    }

    const originHandleDropdown = () => {
        // Only set dropdown options once, when all flights are loaded
        // TODO: update to filter flights
        // TODO: update to only show filtered flight origins
        if(originOptions.size === 0) {
            const loadedOrigins = new Set<string>();
            for (const key in flights) {
                loadedOrigins.add(flights[key].origin);
            }
            setOriginOptions(loadedOrigins);
        }
    }

    const destinationHandleDropdown = () => {
        // Only set dropdown options once, when all flights are loaded
        // TODO: update to filter flights
        // TODO: update to only show filtered flight destinations
        if(destinationOptions.size === 0) {
            const loadedDestination = new Set<string>();
            for (const key in flights) {
                loadedDestination.add(flights[key].destination);
            }
            setDestinationOptions(loadedDestination);
        }
    }

    const searchHandleChange = () => {
        if (dateSelected && originSelected && destinationSelected) {
            setSearchUrl(`/dateorigindestination/${dateSelection}/${originSelection}/${destinationSelection}`);
        }
    }

    const resetHandleChange = () => {
        setDateSelection('Select a Date');
        setDateSelected(false);
        setOriginSelection('Select an Origin');
        setOriginSelected(false);
        setDestinationSelection('Select a Destination');
        setDestinationSelected(false);
        setSearchUrl('');
    }

    const dateField = (value: string) => {
        setDateSelection(value);
        setDateSelected(true);
    }

    const originField = (value: string) => {
        setOriginSelection(value);
        setOriginSelected(true);
    }

    const destinationField = (value: string) => {
        setDestinationSelection(value);
        setDestinationSelected(true);
    }

    return (
        <div className='d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center justify-content-center'>
            <div className='container'>
                <div className='d-flex'>
                    <div className='p-2 flex-fill'>
                        <div className='dropdown'>
                            <button className='btn btn-secondary dropdown-toggle' type='button'
                                    data-bs-toggle='dropdown' aria-expanded='false' onClick={dateHandleDropdown}>
                                {dateSelection}
                            </button>
                            <ul className='dropdown-menu'>
                                {Array.from(dateOptions.values()).map((date, index) => (
                                    <li onClick={() => dateField(date)} key={index}>
                                        <a className='dropdown-item' href='#' >
                                            {date}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className='p-2 flex-fill'>
                        <div className='dropdown'>
                            <button className='btn btn-secondary dropdown-toggle' type='button'
                                    data-bs-toggle='dropdown' aria-expanded='false' onClick={originHandleDropdown}>
                                {originSelection}
                            </button>
                            <ul className='dropdown-menu'>
                                {Array.from(originOptions.values()).map((origin, index) => (
                                    <li onClick={() => originField(origin)} key={index}>
                                        <a className='dropdown-item' href='#' >
                                            {origin}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className='p-2 flex-fill'>
                        <div className='dropdown'>
                            <button className='btn btn-secondary dropdown-toggle' type='button'
                                    data-bs-toggle='dropdown' aria-expanded='false' onClick={destinationHandleDropdown}>
                                {destinationSelection}
                            </button>
                            <ul className='dropdown-menu'>
                                {Array.from(destinationOptions.values()).map((dest, index) => (
                                    <li onClick={() => destinationField(dest)} key={index}>
                                        <a className='dropdown-item' href='#' >
                                            {dest}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className='p-2 flex-fill'>
                        <div className='d-flex'>
                            <button className='btn btn-success'
                                    onClick={() => searchHandleChange()}>
                                Search
                            </button>
                        </div>
                    </div>
                    <div className='p-2 flex-fill'>
                        <div className='d-flex'>
                            <button className='btn btn-success'
                                    onClick={() => resetHandleChange()}>
                                Reset
                            </button>
                        </div>
                    </div>
                </div>
                {flights.length > 0 ?
                    <>
                        <div className='mt-3 mb-3'>
                            <h5>Number of flights: {flights.length}</h5>
                        </div>
                        <div className='list-group'>
                            {flights.map(flight => (
                                <Flight flight={flight} key={flight.flightID}/>
                            ))}
                        </div>
                    </>
                    :
                    <>
                        <div className='m-5'>
                            <h5>No flights available</h5>
                        </div>
                    </>
                }
            </div>
        </div>
    );
};