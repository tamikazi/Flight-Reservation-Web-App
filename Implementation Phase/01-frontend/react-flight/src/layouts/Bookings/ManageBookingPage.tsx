import {useContext, useEffect, useState} from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import PassengerModel from "../../models/PassengerModel";
import {SpinnerLoading} from "../Utils/SpinnerLoading";
import BookingModel from "../../models/BookingModel";

export const ManageBookingPage = () => {
    const currentUser = useContext(CurrentUserContext);

    const [tickets, setTickets] = useState<BookingModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            const url: string = `http://localhost:8080/api/manifest/${code}/${date}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseData = await response.json();

            const loadedPassengers: PassengerModel[] = [];

            for (const key in responseData) {
                loadedPassengers.push({
                    name: responseData[key].name,
                    seat: responseData[key].seat
                });
            }

            setPassengers(loadedPassengers);
            setIsLoading(false);
        };
        fetchBookings().catch((error: any) => {
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
        <div></div>
    )
}