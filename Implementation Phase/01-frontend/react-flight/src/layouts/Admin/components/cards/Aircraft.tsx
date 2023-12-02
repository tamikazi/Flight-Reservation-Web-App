import AircraftView from "../../../../models/AircraftView";
import React from "react";

export const Aircraft: React.FC<{
    aircraft: AircraftView,
    select: any
}> = (props) => {
    return (
        <button className='list-group-item list-group-item-action d-flex gap-5 py-3' onClick={props.select}>
            <h4>{props.aircraft.model}</h4>
            <div className='d-flex flex-row'>
                <div className='mx-3'>
                    <h6 className='mb-0'>Aircraft ID: {props.aircraft.aircraftID}</h6>
                </div>
                <div className='mx-3'>
                    <h6 className='mb-0'>Rows of seats: {props.aircraft.numRows}</h6>
                    <h6 className='mb-0'>Columns of seats: {props.aircraft.numCols}</h6>
                </div>
            </div>
        </button>
    );
};