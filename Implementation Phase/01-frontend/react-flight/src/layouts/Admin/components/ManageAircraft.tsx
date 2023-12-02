import {useEffect, useState} from "react";
import {SpinnerLoading} from "../../Utils/SpinnerLoading";
import AircraftView from "../../../models/AircraftView";
import {Aircraft} from "./cards/Aircraft";

export const ManageAircraft = () => {

    const [aircraft, setAircraft] = useState<AircraftView[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [searchUrl, setSearchUrl] = useState('');

    useEffect(() => {
        const fetchAircraft = async () => {
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
            // const loadedFlights: FlightView[] = [];
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

            // Generate random names
            const loadedAircraft: AircraftView[] = [];
            loadedAircraft.push({aircraftID: 0, model: 'B787', numCols: 4, numRows: 8});
            loadedAircraft.push({aircraftID: 1, model: 'A220', numCols: 6, numRows: 20});

            setAircraft(loadedAircraft);
            setIsLoading(false);
        };
        fetchAircraft().catch((error: any) => {
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
                    Manage aircraft
                </div>
                <div className='card-body'>
                    <form>
                        <div className='row g-3 mb-5'>
                            <div className='col-4'>
                                <label htmlFor='code' className='form-label'>Aircraft Model</label>
                                <input type='text' className='form-control' id='model'/>
                            </div>
                            <div className='col-4'>
                                <label htmlFor='date' className='form-label'>Rows of Seats</label>
                                <input type='number' className='form-control' id='rows'/>
                            </div>
                            <div className='col-4'>
                                <label htmlFor='origin' className='form-label'>Columns of Seats</label>
                                <input type='number' className='form-control' id='columns'/>
                            </div>
                            <div className='col'>
                                <button className='btn btn-primary' type='button'>
                                    Add
                                </button>
                            </div>
                        </div>
                    </form>
                    <div>
                        {aircraft.length > 0 ?
                            <>
                                <div className='list-group'>
                                    {aircraft.map((aircraft, index) => (
                                        <Aircraft aircraft={aircraft} key={index}/>
                                    ))}
                                </div>
                            </>
                            :
                            <>
                                <div className='m-5'>
                                    <h5>No crew assigned</h5>
                                </div>
                            </>
                        }
                        <button className='btn btn-primary mt-3' onClick={() => {}}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};