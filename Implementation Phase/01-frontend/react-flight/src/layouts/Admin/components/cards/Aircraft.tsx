import AircraftModel from "../../../../models/AircraftModel";
import React from "react";

export const Aircraft: React.FC<{ aircraft: AircraftModel }> = (props) => {
    return (
        <button className='list-group-item list-group-item-action d-flex gap-5 py-3'>
            <h4>{props.aircraft.model}</h4>
            <div className='d-flex gap-2 w-100 justify-content-between'>
                <div>
                    <h6 className='mb-0'>Rows of seats: {props.aircraft.numRows}</h6>
                    <h6 className='mb-0'>Columns of seats: {props.aircraft.numCols}</h6>
                </div>
            </div>
        </button>
    );
};