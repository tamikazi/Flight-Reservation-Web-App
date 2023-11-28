import SeatMapModel from "../../../models/SeatMapModel";

export const Seat: React.FC<{ seat: SeatMapModel, onClick: any }> = (props) => {
    return (
        <>
            {/*<input type='checkbox' className='btn-check m-1' name='seatOptions' id={`${props.seat.seatId}`}*/}
            {/*       autoComplete='off' disabled={!props.seat.available} onClick={props.onClick}/>*/}
            {/*<label className='btn btn-primary' htmlFor={`${props.seat.seatId}`}>{props.seat.seatNumber}</label>*/}
            <button type='button' className='btn btn-primary' data-bs-toggle='button' disabled={!props.seat.available}
                    onClick={props.onClick}>
                {props.seat.seatNumber}<br/>
                {props.seat.seatClass}<br/>
                {`$${props.seat.price}`}
            </button>
        </>
    );
}