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
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {

        // Generate random names
        const loadedPassengers: PassengerModel[] = [];
        loadedPassengers.push({name:'Ann Smith', seat:'A1'});
        loadedPassengers.push({name:'Bob Wong', seat:'A2'});
        loadedPassengers.push({name:'Charlie Puck', seat:'B3'});
        loadedPassengers.push({name:'Danny Bob', seat:'B4'});
        loadedPassengers.push({name:'Erica Stevens', seat:'C1'});
        setPassengers(loadedPassengers);
    }, []);

    useEffect(() => {
        const fetchManifest = async () => {
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
        fetchManifest().catch((error: any) => {
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

    return (
        <div className='container'>
            {(currentUser.role == Roles.Admin || currentUser.role == Roles.Crew || currentUser.role == Roles.Agent) ?
                <div>
                    <div className='row mt-5'>
                        <div className='col-6'>
                            <div className='d-flex'>
                                <input className='form-control me-2' type='text'
                                       placeholder='Enter Flight Number (AB123)' id='code'
                                       onChange={(e) => {setCode(e.target.value)}}/>
                                <input className='form-control me-2' type='date' id='date'
                                       onChange={(e) => {setDate(e.target.value)}}/>
                                <button className='btn btn-outline-success'
                                        onClick={() => {}}>
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
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