import FlightView from "../../../models/FlightView";

export const Flight: React.FC<{
    flight: FlightView,
    onClick: any
}> = (props) => {
    return (
        <button className='list-group-item list-group-item-action d-flex gap-5 py-3'
              onClick={props.onClick}
              aria-current='true'>
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
                    <p className='mb-0 opacity-75'>Base Price: ${props.flight.basePrice.toFixed(2)}</p>
                </div>
            </div>
        </button>
    )
}