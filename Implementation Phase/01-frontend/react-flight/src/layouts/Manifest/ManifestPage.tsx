import {useContext, useEffect, useState} from "react";
import PassengerModel from "../../models/PassengerModel";
import {Passenger} from "./components/Passenger";
import CurrentUserContext, {Roles} from "../../contexts/CurrentUserContext";
import FlightModel from "../../models/FlightModel";
import {SpinnerLoading} from "../Utils/SpinnerLoading";

export const ManifestPage = () => {
    const currentUser = useContext(CurrentUserContext);

    const [passengers, setPassengers] = useState<PassengerModel[]>([]);
    const [code, setCode] = useState('');
    const [date, setDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState(null);

    // Alerts
    const [displayFieldsWarning, setDisplayFieldsWarning] = useState(false);
    const [displayFailureWarning, setDisplayFailureWarning] = useState(false);

    const fetchManifest = async () => {
        const url: string = `http://localhost:8080/api/manifest/${code}/${date}`;

        const response = await fetch(url);

        if (!response.ok) {
            setDisplayFailureWarning(true);
            return;
        }

        const responseData = await response.json();

        const loadedPassengers: PassengerModel[] = [];

        for (const key in responseData) {
            loadedPassengers.push({
                name: responseData[key].name,
                seat: responseData[key].seatNumber
            });
        }

        setPassengers(loadedPassengers);
        setIsLoading(false);
    };

    if (isLoading) {
        return (
            <SpinnerLoading/>
        )
    }

    const searchHandle = () => {
        setDisplayFailureWarning(false);
        setDisplayFieldsWarning(false);
        if (code !== '' && date !== '') {
            fetchManifest()
        } else {
            setDisplayFieldsWarning(true);
        }
    }

    return (
        <div className='container mt-5'>
            {(currentUser.role == Roles.Admin || currentUser.role == Roles.Crew || currentUser.role == Roles.Agent) ?
                <div>
                    <div className='row d-flex mb-3'>
                        <div className='col-4'>
                            <input type='text' id='code' className='form-control' placeholder='Flight code'
                                   onChange={e => setCode(e.target.value)}/>
                        </div>
                        <div className='col-4'>
                            <input type='date' className='form-control' id='date'
                                   onChange={e => setDate(e.target.value)}/>
                        </div>
                        <div className='col-4'>
                            <button type='button' className='col btn btn-primary'
                                    onClick={searchHandle}>
                                Search
                            </button>
                        </div>
                    </div>
                    {displayFieldsWarning &&
                        <div className='alert alert-danger' role='alert'>
                            All fields must be filled in
                        </div>
                    }
                    {displayFailureWarning &&
                        <div className='alert alert-danger' role='alert'>
                            Failed to find flight. Check inputs.
                        </div>
                    }
                    <div>
                        {passengers.length > 0 ?

                            <div className='list-group mt-5'>
                                {passengers.map((passenger, index) => (
                                    <Passenger passenger={passenger} key={index}/>
                                ))}
                            </div>
                            :
                            <></>
                        }
                    </div>
                </div>
                :
                <h3>Authorized access only</h3>
            }
        </div>
    );
};