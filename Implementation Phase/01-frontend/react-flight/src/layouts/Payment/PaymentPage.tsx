import {Link, useHistory} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import PaymentModel from "../../models/PaymentModel";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import CheckoutSeatModel from "../../models/CheckoutSeatModel";
import {SpinnerLoading} from "../Utils/SpinnerLoading";
import TicketModel from "../../models/TicketModel";
import TicketRequestView from "../../models/TicketRequestView";
import PaymentRequestView from "../../models/PaymentRequestView";

export const PaymentPage:React.FC<{
    checkoutFlightId: string,
    checkoutSeats: CheckoutSeatModel[],
    checkoutCost: number,
    checkoutInsurance: boolean
}> = (props) => {
    const currentUser = useContext(CurrentUserContext);

    const history = useHistory();

    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCVV, setCardCVV] = useState('');
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    // Displays
    const [paymentWarning, setPaymentWarning] = useState(false);
    const [ticketWarning, setTicketWarning] = useState(false);

    async function sendPayment() {
        try {
            const url = `http://localhost:8080/api/payment/add`

            const today = new Date().toLocaleDateString('en-CA')

            const paymentRequest = new PaymentRequestView(currentUser.userId, today, props.checkoutCost)

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(paymentRequest)
            };

            const paymentResponse = await fetch(url, requestOptions);

            // Check if payment was successful
            if (!paymentResponse.ok) {
                setPaymentWarning(true);
                return;
            } else {
                setPaymentWarning(false);
                // Call ticket post request
                await sendTicket();
            }
        } catch (error) {
            setPaymentWarning(true);
        }
    }

    async function sendTicket() {
        try {
            const url = `http://localhost:8080/api/tickets/add`

            const ticketRequest: TicketRequestView[] = [];

            for(const i in props.checkoutSeats) {
                ticketRequest.push({
                    seatID: props.checkoutSeats[i].seatId,
                    flightID: props.checkoutFlightId,
                    userID: currentUser.userId,
                    name: props.checkoutSeats[i].name,
                    price: props.checkoutCost,
                    insurance: props.checkoutInsurance
                })
            }

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ticketRequest)
            };

            const ticketResponse = await fetch(url, requestOptions);
            if(!ticketResponse.ok) {
                setTicketWarning(true);
                return;
            }

            // Redirect to payment success page
            // history.push('/success')

        } catch (error) {
            setTicketWarning(true);
        }

    }

    const payHandleChange = () => {
        if(cardNumber !== '' && cardName !== '' && cardExpiry !== '' && cardCVV !== '') {
            void sendPayment();
        }
    }

    return (
        <div className='container mt-5'>
            <div className='form-payment w-100 mx-auto'>
                <form className='row g-3'>
                    <div className='col-12'>
                        <label htmlFor='cardNumber' className='form-label'>Card Number</label>
                        <input type='text' className='form-control' id='cardNumber'
                               onChange={e => setCardNumber(e.target.value)}/>
                    </div>
                    <div className='col-12'>
                        <label htmlFor='cardName' className='form-label'>Name on Card</label>
                        <input type='text' className='form-control' id='cardName'
                               onChange={e => setCardName(e.target.value)}/>
                    </div>
                    <div className='col-6'>
                        <label htmlFor='cardDate' className='form-label'>Expiry Date</label>
                        <input type='text' className='form-control' id='cardDate'
                               onChange={e => setCardExpiry(e.target.value)}/>
                    </div>
                    <div className='col-6'>
                        <label htmlFor='cardCVV' className='form-label'>CVV</label>
                        <input type='text' className='form-control' id='cardCVV'
                               onChange={e => setCardCVV(e.target.value)}/>
                    </div>
                    <div className='col-6'>
                        <Link type='button' className='btn btn-primary' to='/names'>Back</Link>
                    </div>
                    <div className='col-6'>
                        <button type='button' className='btn btn-primary' onClick={payHandleChange}>Pay</button>
                    </div>
                </form>
            </div>
            {paymentWarning &&
                <div className='alert alert-danger' role='alert'>
                    Payment failed
                </div>
            }
            {ticketWarning &&
                <div className='alert alert-danger' role='alert'>
                    Ticket transaction failed
                </div>
            }
        </div>
    );
};