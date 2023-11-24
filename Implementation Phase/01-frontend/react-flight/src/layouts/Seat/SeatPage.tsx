import FlightModel from "../../models/FlightModel";
import React, {useEffect, useState} from "react";
import SeatModel from "../../models/SeatModel";
import {Seat} from "./components/Seat";
import {Link} from "react-router-dom";
import {SpinnerLoading} from "../Utils/SpinnerLoading";

export const SeatPage = () => {

    const [seats, setSeats] = useState<SeatModel[]>([]);
    const [flight, setFlight] = useState<FlightModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    // Get flightid from url
    const flightParam = (window.location.pathname).split('/')[3];

    // Make up row/column
    const seatColumns: number = 4;
    const seatRows: number = 5;

    // Get flight
    useEffect(() => {

        const fetchFlight = async () => {
            // const url: string = `http://localhost:8080/api/flights/id/${flightParam}`;
            //
            // const response = await fetch(url);
            //
            // if (!response.ok) {
            //     throw new Error('Something went wrong!');
            // }
            //
            // const responseData = await response.json();
            //
            // const loadedFlight: FlightModel = {
            //     flightId: responseData.flightId,
            //     code: responseData.code,
            //     origin: responseData.origin,
            //     destination: responseData.destination,
            //     date: responseData.date,
            //     time: responseData.time,
            //     aircraft: responseData.aircraft
            // };

            //  Fake data
            const mockFlight: FlightModel = ({
                flightID: 1,
                code: 'AB100',
                origin: 'Calgary',
                destination: 'Vancouver',
                date: '2023-11-30',
                time: '1350',
                aircraft: 1
            });

            setFlight(mockFlight);
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
                        aircraftId: flight.aircraft
                    });
                    count++;
                }
            }
            //Set some seats as unavailable
            loadedSeats[2].available = false;
            loadedSeats[9].available = false;
            loadedSeats[10].available = false;
            loadedSeats[15].available = false;
            loadedSeats[17].available = false;
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
        <div className='container text-center'>
            <div className='row mt-5 justify-content-evenly'>
                <div className='col-4'>
                    <h4>Airplane Front</h4>
                    <div className={`row row-cols-${seatColumns} g-1`}>
                        {seats.map(seat => (
                            <Seat seat={seat} key={seat.seatId}/>
                        ))}
                    </div>
                    <h4>Airplane Back</h4>
                </div>
                <div className='col-4 '>
                    <div className='ml-2'>
                        <h2>Class</h2>
                        <div className='form-check'>
                            <input className='form-check-input' type='radio' name='seatClass' id='standard'
                                   defaultChecked={true}/>
                            <label className='form-check-label' htmlFor='standard'>Standard</label>
                        </div>
                        <div className='form-check'>
                            <input className='form-check-input' type='radio' name='seatClass' id='comfort'/>
                            <label className='form-check-label' htmlFor='comfort'>Comfort</label>
                        </div>
                        <div className='form-check'>
                            <input className='form-check-input' type='radio' name='seatClass' id='business'/>
                            <label className='form-check-label' htmlFor='business'>Business</label>
                        </div>
                        <h2>Insurance</h2>
                        <div className='form-check'>
                            <input className='form-check-input' type='checkbox' name='insurance' id='insurance'/>
                            <label className='form-check-label' htmlFor='insurance'>
                                Purchase cancellation insurance
                            </label>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <Link type='button' className='btn btn-primary' to='/flights'>Back</Link>
                            </div>
                            <div className='col'>
                                <Link type='button' className='btn btn-primary' to='/payment'>Checkout</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};