import {useContext, useEffect, useState} from "react";
import PassengerModel from "../../models/PassengerModel";
import {Passenger} from "./components/Passenger";
import CurrentUserContext, {Roles} from "../../contexts/CurrentUserContext";

export const ManifestPage = () => {
    const currentUser = useContext(CurrentUserContext);

    const [passengers, setPassengers] = useState<PassengerModel[]>([]);

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



    return (
        <div className='container'>
            {(currentUser.role == Roles.Admin || currentUser.role == Roles.Crew) ?
                <div>
                    <div className='row mt-5'>
                        <div className='col-6'>
                            <div className='d-flex'>
                                <input className='form-control me-2' type='search'
                                       placeholder='Enter Flight Number (AB123)' id='number'
                                       onChange={() => {}}/>
                                <input className='form-control me-2' type='date' id='date'
                                       onChange={() => {}}/>
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