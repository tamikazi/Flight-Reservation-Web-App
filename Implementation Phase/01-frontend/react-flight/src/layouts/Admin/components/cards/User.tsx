import React from "react";
import UserView from "../../../../models/UserView";

export const User:React.FC<{user: UserView}> = (props) => {
    return (
        <button className='list-group-item d-flex gap-5 py-3'>
            <h5>Name: {props.user.Fname} {props.user.Lname}</h5>
        </button>
    );
};