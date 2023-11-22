import {Link} from "react-router-dom";
import React from "react";

export const PaymentPage = () => {
    return (
        <div className='form-payment w-100 m-auto'>
            <form className='row g-3'>
                <div className='col-12'>
                    <label htmlFor='cardNumber' className='form-label'>Card Number</label>
                    <input type='text' className='form-control' id='cardNumber'/>
                </div>
                <div className='col-12'>
                    <label htmlFor='cardName' className='form-label'>Name on Card</label>
                    <input type='text' className='form-control' id='cardName'/>
                </div>
                <div className='col-6'>
                    <label htmlFor='cardDate' className='form-label'>Expiry Date</label>
                    <input type='text' className='form-control' id='cardDate'/>
                </div>
                <div className='col-6'>
                    <label htmlFor='cardCVV' className='form-label'>CVV</label>
                    <input type='text' className='form-control' id='cardCVV'/>
                </div>
                <div className='col-6'>
                    <Link type='button' className='btn btn-primary' to='/flights'>Back</Link>
                </div>
                <div className='col-6'>
                    <button className='btn btn-primary' type='submit'>Pay</button>
                </div>
            </form>
        </div>
    );
};