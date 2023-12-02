import {useEffect, useState} from "react";
import FlightView from "../../models/FlightView";
import {SpinnerLoading} from "../Utils/SpinnerLoading";
import {Flight} from "./components/Flight";
import {useHistory} from "react-router-dom";

export const FlightsPage: React.FC<{
    origin: string,
    destination: string,
    date: string
    setCheckoutFlightId: any
}> = (props) => {
    const history = useHistory();

    const [flights, setFlights] = useState<FlightView[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);


    useEffect(() => {
        const fetchFlights = async () => {
            const baseUrl: string = "http://localhost:8080/api/flights";

            let url: string = `${baseUrl}/${props.date}/${props.origin}/${props.destination}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseData = await response.json();

            const loadedFlights: FlightView[] = [];

            for (const key in responseData) {
                loadedFlights.push({
                    flightID: responseData[key].flightID,
                    code: responseData[key].code,
                    origin: responseData[key].origin,
                    destination: responseData[key].destination,
                    date: responseData[key].date,
                    time: responseData[key].time,
                    aircraftID: responseData[key].aircraftID,
                    basePrice: Number(responseData[key].basePrice)
                });
            }

            setFlights(loadedFlights);
            setIsLoading(false);
        };
        fetchFlights().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, []);

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

    const clickHandle = (flightId: string) => {
        props.setCheckoutFlightId(flightId);
        history.push('/seats')
    }

    return (
        <div className='container mt-5'>
            {flights.length > 0 ?
                <>
                    <div className='mt-3 mb-3'>
                        <h5>Number of flights: {flights.length}</h5>
                    </div>
                    <div className='list-group'>
                        {flights.map((flight, index) => (
                            <Flight flight={flight} onClick={() => clickHandle(flight.flightID)} key={index}/>
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
    );
};