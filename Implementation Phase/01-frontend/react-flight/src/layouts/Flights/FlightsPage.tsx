import {useEffect, useState} from "react";
import FlightModel from "../../models/FlightModel";
import {SpinnerLoading} from "../Utils/SpinnerLoading";
import {Flight} from "./components/Flight";
import SearchModel from "../../models/SearchModel";

export const FlightsPage: React.FC<{
    origin: string,
    destination: string,
    date: string
    setCheckoutFlightId: any
}> = (props) => {

    const [flights, setFlights] = useState<FlightModel[]>([]);
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

            const loadedFlights: FlightModel[] = [];

            for (const key in responseData) {
                loadedFlights.push({
                    flightId: responseData[key].flightID,
                    code: responseData[key].code,
                    origin: responseData[key].origin,
                    destination: responseData[key].destination,
                    date: responseData[key].date,
                    time: responseData[key].time,
                    aircraft: responseData[key].aircraft,
                    price: Number(responseData[key].price)
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

    // const clickHandle = (flightId: string) => {
    //     props.setCheckoutFlightId(flightId);
    //     history.push()
    // }

    return (
        <div className='d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center justify-content-center'>
            <div className='container'>
                {flights.length > 0 ?
                    <>
                        <div className='mt-3 mb-3'>
                            <h5>Number of flights: {flights.length}</h5>
                        </div>
                        <div className='list-group'>
                            {flights.map((flight, index) => (
                                <Flight flight={flight} setCheckoutFlightId={props.setCheckoutFlightId} key={index}/>
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