import PaymentModel from "../../../models/PaymentModel";
import React from "react";

export const Receipt:React.FC<{ payment: PaymentModel }> = (props) => {
    return(
        <div className='list-group-item d-flex gap-5 py-3'>
            <h5>Date: {props.payment.payDate}</h5>
            <h5>Amount: ${props.payment.amount}</h5>
        </div>
    )
}