import React from "react";
import PassengerView from "../../../models/PassengerView";

export const Passenger:React.FC<{passenger: PassengerView}> = (props) => {
    return (
        <div className='list-group-item d-flex gap-5 py-3'>
            <h5>Name: {props.passenger.name}</h5>
            <h5>Seat: {props.passenger.seat}</h5>
        </div>
    );
}