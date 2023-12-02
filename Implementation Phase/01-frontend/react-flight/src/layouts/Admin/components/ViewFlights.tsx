import {useState} from "react";
import FlightView from "../../../models/FlightView";
import {SpinnerLoading} from "../../Utils/SpinnerLoading";
import {Flight} from "../../Flights/components/Flight";

export const ViewFlights = () => {

    const [date, setDate] = useState('');
    const [flights, setFlights] = useState<FlightView[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchFlights = async () => {
        let url: string = `http://localhost:8080/api/admin/flights/date/${date}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        const responseData = await response.json();

        const loadedFlights: FlightView[] = [];

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

        setFlights(loadedFlights);
        setIsLoading(false);
    };

    if (isLoading) {
        return (
            <SpinnerLoading/>
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