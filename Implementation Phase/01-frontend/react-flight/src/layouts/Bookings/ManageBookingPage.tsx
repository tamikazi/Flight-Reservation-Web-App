import {useContext, useEffect, useState} from "react";
import CurrentUserContext, {Roles} from "../../contexts/CurrentUserContext";
import PassengerModel from "../../models/PassengerModel";
import {SpinnerLoading} from "../Utils/SpinnerLoading";
import BookingModel from "../../models/BookingModel";
import {Passenger} from "../Manifest/components/Passenger";
import {Booking} from "./components/Booking";
import bookingModel from "../../models/BookingModel";

export const ManageBookingPage = () => {
    const currentUser = useContext(CurrentUserContext);

    const [bookings, setBookings] = useState<BookingModel[]>([]);
    const [selectedBooking, setSelectedBooking] = useState<BookingModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    const [bookingDeleted, setBookingDeleted] = useState(false);

    useEffect(() => {
        const fetchBookings = async () => {
            const url: string = `http://localhost:8080/api/tickets/userid/${currentUser.userId}`;
            // const url: string = `http://localhost:8080/api/tickets/userid/4`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseData = await response.json();

            const loadedBookings: BookingModel[] = [];

            for (const key in responseData) {
                loadedBookings.push({
                    ticketId: Number(responseData[key].ticketID),
                    code: responseData[key].code,
                    origin: responseData[key].origin,
                    destination: responseData[key].destination,
                    date: responseData[key].date,
                    seatNumber: responseData[key].seatNumber,
                    name: responseData[key].name,
                    insurance: Boolean(responseData[key].insurance)
                });
            }

            setBookings(loadedBookings);
            setIsLoading(false);
        };
        fetchBookings().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, [bookingDeleted]);

    async function deleteBooking() {
        const url = `http://localhost:8080/api/tickets/delete/${selectedBooking?.ticketId}`;
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const updateResponse = await fetch(url, requestOptions);
        if(!updateResponse.ok) {
            throw new Error('Something went wrong!');
        }

        // Trigger fetching all bookings
        setBookingDeleted(!bookingDeleted)
    }

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
                <>
                    <button className='btn btn-primary mt-3' onClick={deleteBooking}>
                        Cancel Booking
                    </button>
                    <div>
                        {bookings.length > 0 ?
                            <div className='list-group mt-5'>
                                {bookings.map((booking, index) => (
                                    <Booking booking={booking} key={index}
                                             select={() => {setSelectedBooking(booking)}}/>
                                ))}
                            </div>
                            :
                            <></>
                        }
                    </div>
                </>
                :
                <h3>Registered Users access only</h3>
            }
        </div>
    )
}