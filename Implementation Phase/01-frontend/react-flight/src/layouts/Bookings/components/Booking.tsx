import BookingModel from "../../../models/BookingModel";
import React from "react";

export const Booking: React.FC<{
    booking: BookingModel,
    select: any
}> = (props) => {
    return(
        <button className='list-group-item list-group-item-action d-flex gap-5 py-3'
                onClick={props.select}>
            <h4 className='mb-0'>{props.booking.code}</h4>
            <div className='d-flex gap-2 w-100 justify-content-between'>
                <div>
                    <h6 className='mb-0'>From: {props.booking.origin}</h6>
                    <h6 className='mb-0'>To: {props.booking.destination}</h6>
                    <p className='mb-0 opacity-75'>Departing: {props.booking.date}</p>
                </div>
                <div>
                    <h6 className='mb-0'>Passenger: {props.booking.name}</h6>
                    <p className='mb-0 opacity-75'>Seat: {props.booking.seatNumber}</p>
                    <p className='mb-0 opacity-75'>Insurance: {props.booking.insurance}</p>
                </div>
            </div>
        </button>
    )
}