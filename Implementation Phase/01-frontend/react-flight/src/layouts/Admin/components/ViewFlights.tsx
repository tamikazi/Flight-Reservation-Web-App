import {Passenger} from "../../Manifest/components/Passenger";
import {useEffect, useState} from "react";
import FlightModel from "../../../models/FlightModel";
import {SpinnerLoading} from "../../Utils/SpinnerLoading";
import {Flight} from "../../Flights/components/Flight";

export const ViewFlights = () => {

    const [date, setDate] = useState('');
    const [triggerSearch, setTriggerSearch] = useState(false);
    const [flights, setFlights] = useState<FlightModel[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState(null);

    // useEffect(() => {
        const fetchFlights = async () => {
            let url: string = `http://localhost:8080/api/admin/flights/date/${date}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseData = await response.json();

            const loadedFlights: FlightModel[] = [];

            for (const key in responseData) {
                loadedFlights.push({
                    flightId: responseData[key].flightID,
                    code: responseData[key].code,
                    origin: responseData[key].origin,
                    destination: responseData[key].destination,
                    date: responseData[key].date,
                    time: responseData[key].time,
                    aircraft: responseData[key].aircraftID,
                    price: Number(responseData[key].basePrice)
                });
            }

            // Fake data
            const mockFlights: FlightModel[] = [];
            mockFlights.push({
                flightId: '1',
                code: 'AB100',
                origin: 'Calgary',
                destination: 'Vancouver',
                date: '2023-11-30',
                time: '0800',
                aircraft: '1',
                price: 100
            });
            mockFlights.push({
                flightId: '2',
                code: 'AB101',
                origin: 'Calgary',
                destination: 'Edmonton',
                date: '2023-11-30',
                time: '1350',
                aircraft: '2',
                price: 100
            });
            mockFlights.push({
                flightId: '3',
                code: 'AB102',
                origin: 'Vancouver',
                destination: 'Calgary',
                date: '2023-11-30',
                time: '1530',
                aircraft: '1',
                price: 100
            });

            setFlights(loadedFlights);
            setIsLoading(false);
        };
    //     fetchFlights().catch((error: any) => {
    //         setIsLoading(false);
    //         setHttpError(error.message);
    //     })
    // }, [triggerSearch]);

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

    const searchHandle = () => {
        if(date !== '') {
            setIsLoading(true);
            void fetchFlights();
        }
    }

    return (
        <div className='container mt-5 mb-5'>
            <div className='card'>
                <div className='card-header'>
                    View flights
                </div>
                <div className='card-body'>
                    <div className='row mt-5 mb-5'>
                        <div className='col-6'>
                            <div className='d-flex'>
                                <input className='form-control me-2' type='date' id='date'
                                       onChange={(e) => {setDate(e.target.value)}}/>
                                <button className='btn btn-primary'
                                        onClick={searchHandle}>
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        {flights.length > 0 ?
                            <>
                                <div className='mt-3 mb-3'>
                                    <h5>Number of flights: {flights.length}</h5>
                                </div>
                                <div className='list-group'>
                                    {flights.map(flight => (
                                        <Flight flight={flight} onClick={() => {}} key={flight.flightId}/>
                                    ))}
                                </div>
                            </>
                            :
                            <>
                                <div className='m-5'>
                                    <h5>No flights</h5>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};