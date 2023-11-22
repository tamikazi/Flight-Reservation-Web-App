import FlightModel from "../../../models/FlightModel";

export const Flight: React.FC<{ flight: FlightModel }> = (props) => {
    return (
        <a className='list-group-item list-group-item-action d-flex gap-5 py-3' href='#' aria-current='true'>
            <h4 className='mb-0'>{props.flight.code}</h4>
            <div className='d-flex gap-2 w-100 justify-content-between'>
                <div>
                    <h6 className='mb-0'>From: {props.flight.origin}</h6>
                    <h6 className='mb-0'>To: {props.flight.destination}</h6>
                    <p className='mb-0 opacity-75'>Departing: {props.flight.date}</p>
                </div>
            </div>
        </a>
    )
}