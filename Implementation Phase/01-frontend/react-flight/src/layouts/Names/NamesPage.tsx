import React, {useState} from "react";
import checkoutSeatModel from "../../models/CheckoutSeatModel";
import {Link} from "react-router-dom";
import {SeatName} from "./components/SeatName";

export const NamesPage: React.FC<{
    checkoutSeats: checkoutSeatModel[],
    setCheckoutSeats: any
}> = (props) => {

    const nameHandleChange = (id: number, newName: string) => {
        const currentSeatIndex = props.checkoutSeats.findIndex((seat) => seat.seatId === id);
        const updatedSeat = Object.assign({}, props.checkoutSeats[currentSeatIndex]);
        updatedSeat.name = newName;
        const newSeats = props.checkoutSeats;
        newSeats[currentSeatIndex] = updatedSeat;
        props.setCheckoutSeats(newSeats);
    }

    return(
        <div className='container mt-5 mb-5'>
            <h3>Please enter the passenger name(s)</h3>
            {props.checkoutSeats.length > 0 ?
                <>
                    {props.checkoutSeats.map((seat) => (
                        <SeatName seat={seat} onChange={nameHandleChange} key={seat.seatId}/>
                    ))}
                </>
            :
                <h5>No seats selected</h5>
            }
            <div className='row'>
                <Link type='button' className='btn btn-primary col-6' to='/seats'>Back</Link>
                <Link type='button' className='btn btn-primary col-6' to='/payment'>Checkout</Link>
            </div>
        </div>
    )
}