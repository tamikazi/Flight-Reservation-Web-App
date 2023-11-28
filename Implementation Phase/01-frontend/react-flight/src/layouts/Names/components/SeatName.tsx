import React from "react";
import checkoutSeatModel from "../../../models/CheckoutSeatModel";

export const SeatName: React.FC<{
    seat: checkoutSeatModel,
    onChange: any
}> = (props) => {
    return(
        <div className='d-flex gap-5 py-3 mt-2'>
            <h5>{props.seat.seatNumber}</h5>
            <div>
                <label htmlFor={`${props.seat.seatId}`} className='form-label'>Passenger Name</label>
                <input type='text' className='form-control' id={`${props.seat.seatId}`}
                       onChange={(e) => props.onChange(props.seat.seatId, e.target.value)}/>
            </div>
        </div>
    );
};