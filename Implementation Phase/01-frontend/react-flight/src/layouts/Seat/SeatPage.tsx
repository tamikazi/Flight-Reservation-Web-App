import FlightModel from "../../models/FlightModel";
import React, {useEffect, useState} from "react";
import SeatModel from "../../models/SeatModel";
import {Seat} from "./components/Seat";
import {useParams} from "react-router-dom";
import {SpinnerLoading} from "../Utils/SpinnerLoading";

export const SeatPage = () => {

    const [seats, setSeats] = useState<SeatModel[]>([]);
    const [flight, setFlight] = useState<FlightModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    // Get flightid from url
    const flightParam = (window.location.pathname).split('/')[2];

    // Make up row/column
    const seatColumns: number = 4;
    const seatRows: number = 5;

    // Get flight
    useEffect(() => {

        const fetchFlight = async () => {
            const url: string = `http://localhost:8080/api/flights/id/${flightParam}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseData = await response.json();

            const loadedFlight: FlightModel = {
                flightId: responseData.flightId,
                code: responseData.code,
                origin: responseData.origin,
                destination: responseData.destination,
                date: responseData.date,
                aircraft: responseData.aircraft
            };

            setFlight(loadedFlight);
            setIsLoading(false);
        };
        fetchFlight().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, [flightParam]);

    // Get seats
    useEffect(() => {

        if (flight != null ){
            // Make up fake seats
            const loadedSeats: SeatModel[] = [];
            let count: number = 0;
            for (let i = 0; i < seatRows; i++) {
                for (let j = 0; j < seatColumns; j++) {
                    loadedSeats.push({
                        seatId: count,
                        code: ""+count,
                        available: true,
                        flightId: flight.flightId
                    });
                    count++;
                }
            }
            setSeats(loadedSeats);
        }


    }, [flight]);

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
        <div className='container'>
            <div className='row mt-5'>
                <div className='col-sm-2 col-md-2'>
                    <div className={`row row-cols-${seatColumns}`}>
                        {seats.map(seat => (
                            <Seat seat={seat} key={seat.seatId}/>
                        ))}
                    </div>
                </div>
                <div className='col-4 col-md-4 container'>
                    <div className='ml-2'>
                        <h2>Class options</h2>
                        <h2>Insurance?</h2>
                        <div className='row'>
                            <div className='col'>
                                <button className='btn btn-success'>
                                    Back
                                </button>
                            </div>
                            <div className='col'>
                                <button className='btn btn-success'>
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};