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
            <div className='d-flex flex-row'>
                <div className='mx-3'>
                    <h6 className='mb-0'>From: {props.booking.origin}</h6>
                    <h6 className='mb-0'>To: {props.booking.destination}</h6>
                    <p className='mb-0'>Departing: {props.booking.date}</p>
                </div>
                <div className='mx-3'>
                    <h6 className='mb-0'>Passenger: {props.booking.name}</h6>
                    <h6 className='mb-0'>Seat: {props.booking.seatNumber}</h6>
                    {props.booking.insurance ?
                        <p className='mb-0'>Insurance: Yes</p>
                        :
                        <p className='mb-0'>Insurance: No</p>
                    }
                </div>
            </div>
        </button>
    )
}