import SeatModel from "../../../models/SeatModel";

export const Seat: React.FC<{ seat: SeatModel }> = (props) => {
    return (
        <>
            <input type='radio' className='btn-check m-1' name='seatOptions' id={props.seat.code}
                   autoComplete='off' disabled={!props.seat.available}/>
            <label className='btn btn-primary' htmlFor={props.seat.code}>{props.seat.code}</label>
        </>
    );
}