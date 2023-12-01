import CurrentUserContext, {Roles} from "../../contexts/CurrentUserContext";
import {Passenger} from "../Manifest/components/Passenger";
import {useContext, useEffect, useState} from "react";
import BookingModel from "../../models/BookingModel";
import {SpinnerLoading} from "../Utils/SpinnerLoading";
import PaymentModel from "../../models/PaymentModel";
import {Receipt} from "./components/Receipt";

export const PaymentHistoryPage = () => {
    const currentUser = useContext(CurrentUserContext);

    const [receipts, setReceipts] = useState<PaymentModel[]>([])
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchReceipts = async () => {
            const url: string = `http://localhost:8080/api/payment/user/${currentUser.userId}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseData = await response.json();

            const loadedReceipts: PaymentModel[] = [];

            for (const key in responseData) {
                loadedReceipts.push({
                    paymentID: responseData[key].paymentID,
                    userID: responseData[key].userID,
                    payDate: responseData[key].payDate,
                    amount: responseData[key].amount
                });
            }

            setReceipts(loadedReceipts);
            setIsLoading(false);
        };
        fetchReceipts().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, []);

    if (isLoading) {
        return (
            <SpinnerLoading/>
        )
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}...</p>
            </div>
        )
    }

    return(
        <div className='container mt-5'>
            {currentUser.role !== 0 ?
                <div>
                    {receipts.length > 0 ?

                        <div className='list-group mt-5'>
                            {receipts.map((receipt, index) => (
                                <Receipt payment={receipt} key={index}/>
                            ))}
                        </div>
                        :
                        <>
                            <div className='m-5'>
                                <h5>No receipts</h5>
                            </div>
                        </>
                    }
                </div>
                :
                <h3>Authorized access only</h3>
            }
        </div>
    )
}