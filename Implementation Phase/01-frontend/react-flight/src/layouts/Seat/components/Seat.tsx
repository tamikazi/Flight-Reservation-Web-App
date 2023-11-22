import SeatModel from "../../../models/SeatModel";

export const Seat: React.FC<{ seat: SeatModel }> = (props) => {
    return (
        // <a className={'list-group-item list-group-item-check d-flex gap-2'} href={'#'} aria-current='true'>
        //     <div className={'input-group'}>
        //         <div className={'input-group-text'}>
        //             {props.seat.code}
        //         </div>
        //     </div>
        // </a>
        <>
            <input type={'radio'} className={'btn-check'} name={'seatOptions'} id={props.seat.code}
                   autoComplete={'off'}/>
            <label className={'btn btn-secondary'} htmlFor={props.seat.code}>{props.seat.code}</label>
        </>
    );
}