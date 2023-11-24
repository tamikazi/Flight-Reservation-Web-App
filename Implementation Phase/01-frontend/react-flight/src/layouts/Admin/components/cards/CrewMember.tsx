import React from "react";
import CrewModel from "../../../../models/CrewModel";

export const CrewMember:React.FC<{crewMember: CrewModel}> = (props) => {
    return (
        <button className='list-group-item list-group-item-action d-flex gap-5 py-3'>
            <h5>Name: {props.crewMember.name}</h5>
        </button>
    );
};