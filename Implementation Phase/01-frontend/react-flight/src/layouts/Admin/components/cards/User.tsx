import React from "react";
import UserModel from "../../../../models/UserModel";

export const User:React.FC<{user: UserModel}> = (props) => {
    return (
        <button className='list-group-item d-flex gap-5 py-3'>
            <h5>Name: {props.user.Fname} {props.user.Lname}</h5>
        </button>
    );
};