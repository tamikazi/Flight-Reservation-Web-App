import React from "react";
import UserModel from "../../../models/UserModel";
import PassengerModel from "../../../models/PassengerModel";

export const Passenger:React.FC<{passenger: PassengerModel}> = (props) => {
    return (
        <div className='list-group-item d-flex gap-5 py-3'>
            <h5>Name: {props.passenger.name}</h5>
            <h5>Seat: {props.passenger.seat}</h5>
        </div>
    );
}