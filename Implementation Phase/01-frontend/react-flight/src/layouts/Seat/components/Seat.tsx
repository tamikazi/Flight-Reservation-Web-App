import SeatModel from "../../../models/SeatModel";

export const Seat: React.FC<{ seat: SeatModel }> = (props) => {
    return (
        <a className={'list-group-item list-group-item-check d-flex gap-2'} href={'#'} aria-current='true'>
            <div className={'input-group'}>
                <div className={'input-group-text'}>
                    <input type={'radio'} aria-label={props.seat.code}/>
                    <span>
                        {props.seat.code}
                    </span>
                </div>
            </div>
        </a>
    );
}