import React from "react";
import UserView from "../../../../models/UserView";

export const User:React.FC<{user: UserView}> = (props) => {
    return (
        <div className='list-group-item d-flex gap-5 py-3'>
            <h5>{props.user.fname} {props.user.lname}</h5>
            <p className='mb-0'>{props.user.username}</p>
            <div className='d-flex flex-row'>
                <div className='mx-3'>
                    <p className='mb-0'>Address: {props.user.address}</p>
                    {props.user.card ?
                        <p className='mb-0'>Company Card: Yes</p>
                    :
                        <p className='mb-0'>Company Card: No</p>
                    }
                </div>
            </div>
        </div>
    );
};