import React from "react";
import CrewView from "../../../../models/CrewView";

export const CrewMember:React.FC<{crewMember: CrewView}> = (props) => {
    return (
        <button className='list-group-item list-group-item-action d-flex gap-5 py-3'>
            <h5>Name: {props.crewMember.name}</h5>
        </button>
    );
};