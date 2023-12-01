import FlightModel from "../../../models/FlightModel";
import {Link} from "react-router-dom";

export const Flight: React.FC<{ flight: FlightModel, setCheckoutFlightId: any }> = (props) => {
    console.log(props.flight)
    return (
        <Link className='list-group-item list-group-item-action d-flex gap-5 py-3'
              onClick={props.setCheckoutFlightId(props.flight.flightId)}
              to={`/seats`} aria-current='true'>
            <h4 className='mb-0'>{props.flight.code}</h4>
            <div className='d-flex flex-row '>
                <div className='mx-3'>
                    <p className='mb-0'>From: {props.flight.origin}</p>
                    <p className='mb-0'>To: {props.flight.destination}</p>
                </div>
                <div className='mx-3'>
                    <p className='mb-0 opacity-75'>Departing: {props.flight.date}</p>
                    <p className='mb-0 opacity-75'>Time: {props.flight.time}</p>
                </div>
                <div className='mx-3'>
                    <p className='mb-0 opacity-75'>Base Price: ${props.flight.price.toFixed(2)}</p>
                </div>
            </div>
        </Link>
    )
}