import {useState} from "react";
import {useHistory} from "react-router-dom";

export const SearchPage: React.FC<{
    setOrigin: any,
    setDestination: any,
    setDate: any,
    setGuests: any
}> = (props) => {
    const history = useHistory();

    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');
    const [guests, setGuests] = useState(0);

    const [displayWarning, setDisplayWarning] = useState(false);

    const searchHandleChange = () => {
        if(origin !== '' && destination !== '' && date !== '' && guests !== 0) {
            // Set global states
            props.setOrigin(origin);
            props.setDestination(destination);
            props.setDate(date);
            props.setGuests(guests);
            // Redirect to next page
            history.push('/flights')
        } else {
            setDisplayWarning(true);
        }
    }

    return (
        <div className='container mt-5'>
            <form className='w-50 mx-auto'>
                <div className='row g-3'>
                    <div className='col-12'>
                        <label htmlFor='from' className='form-label'>From</label>
                        <input type='text' id='from' className='form-control'
                            onChange={e => setOrigin(e.target.value)}/>
                    </div>
                    <div className='col-12'>
                        <label htmlFor='to' className='form-label'>Going to</label>
                        <input type='text' className='form-control' id='to'
                               onChange={e => setDestination(e.target.value)}/>
                    </div>
                    <div className='col-12'>
                        <label htmlFor='date' className='form-label'>Departure Date</label>
                        <input type='date' className='form-control' id='date'
                            onChange={e => setDate(e.target.value)}/>
                    </div>
                    <div className='col-12'>
                        <label htmlFor='guests' className='form-label'>Number of Passengers</label>
                        <input type='number' className='form-control' id='guests'
                                onChange={e => setGuests(Number(e.target.value))}/>
                    </div>
                </div>
                <button type='button' className='btn btn-primary mt-5 mb-3' onClick={searchHandleChange}>
                    Search for Flights
                </button>
                {displayWarning &&
                    <div className='alert alert-danger' role='alert'>
                        All fields must be filled in
                    </div>
                }
            </form>
        </div>
    );
};