import React, {useState} from "react";
import checkoutSeatModel from "../../models/CheckoutSeatModel";
import {Link, useHistory} from "react-router-dom";
import {SeatName} from "./components/SeatName";

export const NamesPage: React.FC<{
    checkoutSeats: checkoutSeatModel[],
    setCheckoutSeats: any
}> = (props) => {
    const history = useHistory();

    const [displayWarning, setDisplayWarning] = useState(false);

    const nameHandleChange = (id: number, newName: string) => {
        const currentSeatIndex = props.checkoutSeats.findIndex((seat) => seat.seatId === id);
        const updatedSeat = Object.assign({}, props.checkoutSeats[currentSeatIndex]);
        updatedSeat.name = newName;
        const newSeats = props.checkoutSeats;
        newSeats[currentSeatIndex] = updatedSeat;
        props.setCheckoutSeats(newSeats);
    }

    const checkoutHandleChange = () => {
        // Check if all seats have names
        let allNamed = true;
        props.checkoutSeats.forEach(seat => {
            if(seat.name == '') {
                allNamed = false;
            }
        })
        if(allNamed) {
            history.push('/payment');
        } else {
            setDisplayWarning(true);
        }
    }

    return(
        <div className='container mt-5'>
            <form className='w-50 mx-auto row'>
                <h3>Enter Passenger name(s)</h3>
                {props.checkoutSeats.length > 0 ?
                    <>
                        {props.checkoutSeats.map((seat) => (
                            <SeatName seat={seat} onChange={nameHandleChange} key={seat.seatId}/>
                        ))}
                    </>
                :
                    <h5>No seats selected</h5>
                }
                <div className='col-6'>
                    <Link type='button' className='btn btn-primary' to='/seats'>Back</Link>
                </div>
                <div className='col-6'>
                    <button type='button' className='btn btn-primary' onClick={checkoutHandleChange}>
                        Checkout
                    </button>
                </div>
                {displayWarning &&
                    <div className='alert alert-danger' role='alert'>
                        All passengers must be named
                    </div>
                }
            </form>
        </div>
    )
}