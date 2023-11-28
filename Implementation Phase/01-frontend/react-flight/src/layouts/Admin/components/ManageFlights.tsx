import {Passenger} from "../../Manifest/components/Passenger";
import {useEffect, useState} from "react";
import FlightModel from "../../../models/FlightModel";
import {SpinnerLoading} from "../../Utils/SpinnerLoading";
import {Flight} from "../../Flights/components/Flight";

export const ManageFlights = () => {

    const [flight, setFlight] = useState<FlightModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [searchUrl, setSearchUrl] = useState('');

    useEffect(() => {
        const fetchFlight = async () => {
            // const baseUrl: string = "http://localhost:8080/api/flights";
            //
            // let url: string;
            //
            // if (searchUrl === '') {
            //     url = `${baseUrl}`;
            // } else {
            //     url = `${baseUrl}${searchUrl}`;
            // }
            //
            // const response = await fetch(url);
            //
            // if (!response.ok) {
            //     throw new Error('Something went wrong!');
            // }
            //
            // const responseData = await response.json();
            //
            // const loadedFlights: FlightModel[] = [];
            //
            // for (const key in responseData) {
            //     loadedFlights.push({
            //         flightId: responseData[key].flightId,
            //         code: responseData[key].code,
            //         origin: responseData[key].origin,
            //         destination: responseData[key].destination,
            //         date: responseData[key].date,
            //         aircraft: responseData[key].aircraft
            //     });
            // }

            // Fake data
            const mockFlight: FlightModel = ({
                flightId: '1',
                code: 'AB100',
                origin: 'Calgary',
                destination: 'Vancouver',
                date: '2023-11-30',
                time: '1350',
                aircraft: '1',
                price: 100
            });


            setFlight(mockFlight);
            setIsLoading(false);
        };
        fetchFlight().catch((error: any) => {
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

    return (
        <div className='container mt-5 mb-5'>
            <div className='card'>
                <div className='card-header'>
                    Manage flights
                </div>
                <div className='card-body'>
                    <form>
                        <div className='row g-3'>
                            <div className='col-6'>
                                <label htmlFor='code' className='form-label'>Flight Code</label>
                                <input type='text' className='form-control' id='code'/>
                            </div>
                            <div className='col-6'>
                                <label htmlFor='date' className='form-label'>Date</label>
                                <input type='date' className='form-control' id='date'/>
                            </div>
                            <div className='col-6'>
                                <label htmlFor='origin' className='form-label'>Origin</label>
                                <input type='text' className='form-control' id='origin'/>
                            </div>
                            <div className='col-6'>
                                <label htmlFor='destination' className='form-label'>Destination</label>
                                <input type='text' className='form-control' id='destination'/>
                            </div>
                            <div className='col d-flex'>
                                <button className='btn btn-primary flex-fill mx-5' type='button'>
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
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};