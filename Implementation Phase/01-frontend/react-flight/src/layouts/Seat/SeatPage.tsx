import FlightModel from "../../models/FlightModel";
import React, {ChangeEvent, useEffect, useState} from "react";
import SeatMapModel from "../../models/SeatMapModel";
import {Seat} from "./components/Seat";
import {Link, useHistory} from "react-router-dom";
import {SpinnerLoading} from "../Utils/SpinnerLoading";
import checkoutSeatModel from "../../models/CheckoutSeatModel";

export const SeatPage: React.FC<{
    checkoutFlightId: string,
    numGuests: number,
    setCheckoutCost: any,
    setCheckoutSeats: any,
    setCheckoutInsurance: any
}> = (props) => {
    const history = useHistory();

    const [seats, setSeats] = useState<SeatMapModel[]>([]);
    const [selectedSeats, setSelectedSeats] = useState<checkoutSeatModel[]>([]);
    const [cost, setCost] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [seatColumns, setSeatColumns] = useState(4);
    const [insuranceChecked, setInsuranceChecked] = useState(false);

    const [displayWarning, setDisplayWarning] = useState(false);

    // Set insurance cost
    const insuranceCost = 50;

    const flightId: string = props.checkoutFlightId;

    // Get flight
    useEffect(() => {

        const fetchFlight = async () => {
            const url: string = `http://localhost:8080/api/seats/flightid/${flightId}`;
            // const url: string = `http://localhost:8080/api/seats/flightid/1`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseData = await response.json();

            const loadedSeats: SeatMapModel[] = [];

            for (const key in responseData) {
                loadedSeats.push({
                    seatId: responseData[key].seatID,
                    seatNumber: responseData[key].seatNumber,
                    seatClass: responseData[key].seatClass,
                    available: responseData[key].available,
                    price: responseData[key].price
                });
            }

            setSeats(loadedSeats);
            setIsLoading(false);
            // Reset insurance
            props.setCheckoutInsurance(false);
        };
        fetchFlight().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, [seatColumns]);

    // Get seat columns
    useEffect(() => {

        const fetchSeatColumns = async () => {
            const url: string = `http://localhost:8080/api/aircraft/${flightId}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseData = await response.json();

            const loadedSeatColumns: number = responseData.numCols;

            setSeatColumns(loadedSeatColumns);
            setIsLoading(false);
        };
        fetchSeatColumns().catch((error: any) => {
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

    // When seat is selected, adds the seat to local selection array and updates cost, removes if already there
    const seatHandleChange = (seat: SeatMapModel) => {
        const seatList = selectedSeats;

        // Check if already in list
        const i = seatList.findIndex(s => s.seatId === seat.seatId)
        if(i > -1) {
            // Exists in list
            seatList.splice(i,1);
            setCost(cost - seat.price);
        } else {
            // Add to list
            seatList.push({
                seatId: seat.seatId,
                seatNumber: seat.seatNumber,
                name: '',
                price: seat.price
            })
            setCost(cost + seat.price);

        }

        // Update local state list
        setSelectedSeats(seatList);

    }

    // Set hoisted state variables when next button is clicked
    const nextButtonHandleChange = () => {
        // Set global state
        props.setCheckoutSeats(selectedSeats);
        props.setCheckoutCost(cost);
        props.setCheckoutInsurance(insuranceChecked);
        // Check number of seats matches number of guests
        if(selectedSeats.length == props.numGuests) {
            // Redirect to next page
            history.push('/names')
        } else {
            setDisplayWarning(true);
        }
    }

    const insuranceHandleChange = () => {
        if(insuranceChecked) {
            // if already checked
            setCost(cost - insuranceCost);
        } else {
            // if not checked
            setCost(cost + insuranceCost);
        }
        setInsuranceChecked(!insuranceChecked);
    }


    return (
        <div className='container text-center'>
            <div className='row mt-5 justify-content-evenly'>
                <div className='col-4'>
                    <h4>Airplane Front</h4>
                    <div className={`row row-cols-${seatColumns} gy-1`}>
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
                                        onChange={insuranceHandleChange}/>
                                <label className='form-check-label' htmlFor='insurance'>
                                    Purchase cancellation insurance - $50
                                </label>
                            </div>
                        </div>
                        <div className='row mt-3'>
                        <h2>Cost</h2>
                        <div className='form-check'>
                            <span>{`Total Cost: $${cost.toFixed(2)}`}</span>
                        </div>
                    </div>
                        <div className='row mt-3 mb-3'>
                            <div className='col'>
                                <Link type='button' className='btn btn-primary' to='/flights'>Back</Link>
                            </div>
                            <div className='col'>
                                <button type='button' className='btn btn-primary' onClick={nextButtonHandleChange}>
                                    Next
                                </button>
                            </div>
                        </div>
                        {displayWarning &&
                            <div className='alert alert-danger' role='alert'>
                                Must select {props.numGuests} seats
                            </div>
                        }
                    </div>
                </div>
            </div>

        </div>
    );
};