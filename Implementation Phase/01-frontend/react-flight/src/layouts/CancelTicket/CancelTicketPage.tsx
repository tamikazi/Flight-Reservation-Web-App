import {useState} from "react";
import BookingModel from "../../models/BookingModel";

export const CancelTicketPage = () => {
    const [ticketId, setTicketId] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState(false);

    // Alerts
    const [displayFieldsWarning, setDisplayFieldsWarning] = useState(false);
    const [displayFailureWarning, setDisplayFailureWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    const fetchBooking = async () => {
        const url: string = `http://localhost:8080/api/tickets/id/${ticketId}`;

        const response = await fetch(url);

        if (!response.ok) {
            setDisplayFailureWarning(true);
            return;
        }

        const responseData = await response.json();

        return responseData.name;
    };

    const deleteBooking = async () => {
        // Get name associated with ticketId
        const validationName = await fetchBooking();

        // Check if entered name matches name on ticket for validation
        if(name !== validationName) {
            setDisplayFailureWarning(true);
            return;
        }

        const url = `http://localhost:8080/api/tickets/delete/${ticketId}`;
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const updateResponse = await fetch(url, requestOptions);
        if (!updateResponse.ok) {
            setDisplayFailureWarning(true);
            return;
        }

        // Cancel was successful
        setDisplayFieldsWarning(false);
        setDisplayFailureWarning(false);
        setDisplaySuccess(true);
    }

    const cancelHandle = () => {
        setDisplaySuccess(false);
        setDisplayFieldsWarning(false);
        setDisplayFailureWarning(false);

        if(ticketId !== '' && name !== '') {
            deleteBooking();
        } else {
            setDisplayFieldsWarning(true);
        }
    }

    return(
        <div className='container mt-5'>
            <form className='w-50 mx-auto'>
                <div className='row g-3'>
                    <div className='col-12'>
                        <label htmlFor='id' className='form-label'>Ticket ID</label>
                        <input type='text' id='id' className='form-control'
                               onChange={e => setTicketId(e.target.value)}/>
                    </div>
                    <div className='col-12'>
                        <label htmlFor='name' className='form-label'>Name on Ticket</label>
                        <input type='text' className='form-control' id='name'
                               onChange={e => setName(e.target.value)}/>
                    </div>
                </div>
                <button type='button' className='btn btn-primary mt-5 mb-3' onClick={cancelHandle}>
                    Cancel Ticket
                </button>
                {displayFieldsWarning &&
                    <div className='alert alert-danger' role='alert'>
                        All fields must be filled in
                    </div>
                }
                {displayFailureWarning &&
                    <div className='alert alert-danger' role='alert'>
                        Failed to cancel ticket. Check inputs.
                    </div>
                }
                {displaySuccess &&
                    <div className='alert alert-success' role='alert'>
                        Ticket Cancelled
                    </div>
                }
            </form>
        </div>
    );
};