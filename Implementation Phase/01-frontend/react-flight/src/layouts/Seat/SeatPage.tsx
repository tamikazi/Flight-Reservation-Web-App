import FlightModel from "../../models/FlightModel";
import React, {useEffect, useState} from "react";
import SeatMapModel from "../../models/SeatMapModel";
import {Seat} from "./components/Seat";
import {Link} from "react-router-dom";
import {SpinnerLoading} from "../Utils/SpinnerLoading";

export const SeatPage: React.FC<{
    setCheckoutCost: any,
    setCheckoutSeatIds: any,
    setCheckoutInsurance: any
}> = (props) => {

    const [seats, setSeats] = useState<SeatMapModel[]>([]);
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const [cost, setCost] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    // Make up row/column
    const seatColumns: number = 4;
    const seatRows: number = 5;

    // Get flight
    // useEffect(() => {
    //
    //     const fetchFlight = async () => {
    //         const url: string = `http://localhost:8080/api/flights/id/1`;
    //         // const url: string = `http://localhost:8080/api/flights/id/${props.flightId}`;
    //
    //         const response = await fetch(url);
    //
    //         if (!response.ok) {
    //             throw new Error('Something went wrong!');
    //         }
    //
    //         const responseData = await response.json();
    //
    //         const loadedFlight: FlightModel = {
    //             flightId: responseData.flightId,
    //             code: responseData.code,
    //             origin: responseData.origin,
    //             destination: responseData.destination,
    //             date: responseData.date,
    //             time: responseData.time,
    //             aircraft: responseData.aircraft,
    //         };
    //
    //         // //  Fake data
    //         // const mockFlight: FlightModel = ({
    //         //     flightID: 1,
    //         //     code: 'AB100',
    //         //     origin: 'Calgary',
    //         //     destination: 'Vancouver',
    //         //     date: '2023-11-30',
    //         //     time: '1350',
    //         //     aircraft: 1
    //         // });
    //
    //         setFlight(loadedFlight);
    //         setIsLoading(false);
    //     };
    //     fetchFlight().catch((error: any) => {
    //         setIsLoading(false);
    //         setHttpError(error.message);
    //     })
    // }, []);

    // Get seats
    useEffect(() => {

        // Make up fake seats
        const loadedSeats: SeatMapModel[] = [];
        let count: number = 0;
        for (let i = 0; i < seatRows; i++) {
            for (let j = 0; j < seatColumns; j++) {
                loadedSeats.push({
                    seatId: count,
                    seatNumber: "A1",
                    seatClass: "Standard",
                    available: true,
                    price: 100
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
        setIsLoading(false);

    //
    //     const fetchSeats =  () => {
    //
    //
    //     };
    //     fetchSeats().catch((error: any) => {
    //         setIsLoading(false);
    //         setHttpError(error.message);
    //     })
    //
    //
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

    // When seat is selected, adds the seat to selection array and updates cost, removes if already there
    const seatHandleChange = (seat: SeatMapModel) => {
        const seatList = selectedSeats;

        if(seatList.includes(seat.seatId)){
            // Remove if already in array (seat is unselected)
            const index = seatList.indexOf(seat.seatId);
            seatList.splice(index, 1);
            setCost(cost - seat.price);
        } else {
            // Add if not already in array (seat is selected)
            seatList.push(seat.seatId);
            setCost(cost + seat.price);
        }

        setSelectedSeats(seatList);
    }

    // Set hoisted state variables when next button is clicked
    const nextButtonHandleChange = (seatList: number[], cost: number) => {
        props.setCheckoutSeatIds(seatList);
        props.setCheckoutCost(cost);
    }

    return (
        <div className='container text-center'>
            <div className='row mt-5 justify-content-evenly'>
                <div className='col-4'>
                    <h4>Airplane Front</h4>
                    <div className={`row row-cols-${seatColumns} g-1`}>
                        {seats.map(seat => (
                            <Seat seat={seat} onClick={() => seatHandleChange(seat)} key={seat.seatId}/>
                        ))}
                    </div>
                    <h4>Airplane Back</h4>
                </div>
                <div className='col-4 '>
                    <div className='ml-2'>
                        <div className='row'>
                            <h2>Insurance</h2>
                            <div className='form-check'>
                                <input className='form-check-input' type='checkbox' name='insurance' id='insurance'
                                        onChange={e => props.setCheckoutInsurance(e.target.checked)}/>
                                <label className='form-check-label' htmlFor='insurance'>
                                    Purchase cancellation insurance
                                </label>
                            </div>
                        </div>
                        <div className='row mt-3'>
                        <h2>Cost</h2>
                        <div className='form-check'>
                            <span>{`Total Cost: $${cost}`}</span>
                        </div>
                    </div>
                        <div className='row mt-3'>
                            <div className='col'>
                                <Link type='button' className='btn btn-primary' to='/flights'>Back</Link>
                            </div>
                            <div className='col'>
                                <Link type='button' className='btn btn-primary' to='/payment'
                                      onClick={() => nextButtonHandleChange(selectedSeats, cost)}>Next</Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};