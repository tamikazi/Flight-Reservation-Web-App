import React, {useEffect, useState} from "react";
import {SpinnerLoading} from "../../Utils/SpinnerLoading";
import CrewView from "../../../models/CrewView";
import {CrewMember} from "./cards/CrewMember";
import crewView from "../../../models/CrewView";

export const ManageCrew = () => {

    const [allCrew, setAllCrew] = useState<CrewView[]>([]);
    const [flightCrew, setFlightCrew] = useState<CrewView[]>([]);
    const [searchId, setSearchId] = useState('');
    const [flightId, setFlightId] = useState('');
    const [selectedAvailableCrew, setSelectedAvailableCrew] = useState<crewView|null>(null);
    const [selectedFlightCrew, setSelectedFlightCrew] = useState<crewView|null>(null);
    const [crewUpdate, setCrewUpdate] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    const [displayWarning, setDisplayWarning] = useState(false);
    const [displayFailure, setDisplayFailure] = useState(false);
    const [displaySelectWarning, setDisplaySelectWarning] = useState(false);

    useEffect(() => {
        const fetchAllCrew = async () => {

            const url: string = "http://localhost:8080/api/admin/crewflights/all";

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseData = await response.json();

            const uniqueCrew: CrewView[] = []

            for (const key in responseData) {
                const loadedCrew = new CrewView(
                    responseData[key].userID,
                    responseData[key].flightID,
                    responseData[key].name,
                );
                // Add only if crew isn't already listed
                if(!uniqueCrew.some(c => c.userID == loadedCrew.userID)) {
                    uniqueCrew.push(loadedCrew);
                }
            }

            setAllCrew(uniqueCrew);
            setIsLoading(false);
        };
        fetchAllCrew().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, [crewUpdate]);

    const fetchCrew = async () => {

        const url: string = `http://localhost:8080/api/admin/crewflights/flight/${searchId}`;

        const response = await fetch(url);

        if (!response.ok) {
            setDisplayFailure(true);
            return;
        }

        const responseData = await response.json();

        if (!responseData) {
            setDisplayFailure(true);
            return;
        }

        const loadedCrew: CrewView[] = [];

        for (const key in responseData) {
            loadedCrew.push({
                userID: responseData[key].userID,
                flightID: responseData[key].flightID,
                name: responseData[key].name,
            });
        }

        setFlightCrew(loadedCrew);

    };

    const assignCrew = async () => {
        if(selectedAvailableCrew){
            const url: string = `http://localhost:8080/api/admin/crewflights/add`;

            const assignedCrew = new CrewView(
                selectedAvailableCrew.userID,
                Number(flightId),
                selectedAvailableCrew.name);

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(assignedCrew)
            };

            const updateResponse = await fetch(url, requestOptions);

            if (!updateResponse.ok) {
                setDisplayFailure(true);
                return;
            } else {
                // Trigger crew lists update
                await fetchCrew();
                setCrewUpdate(!crewUpdate);

                setSelectedFlightCrew(null);
                setSelectedAvailableCrew(null);
            }
        }
    };

    const removeCrew = async () => {
        if(selectedFlightCrew) {
            const url: string = `http://localhost:8080/api/admin/crewflights/delete/
            ${selectedFlightCrew.userID}/${flightId}`;

            const requestOptions = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const updateResponse = await fetch(url, requestOptions);


            if (!updateResponse.ok) {
                setDisplayFailure(true);
                return;
            } else {
                // Trigger crew lists update
                await fetchCrew();
                setCrewUpdate(!crewUpdate);

                setSelectedFlightCrew(null);
                setSelectedAvailableCrew(null);
            }
        }
    };

    const searchHandle = () => {
        setDisplayFailure(false);
        setDisplayWarning(false);
        setDisplaySelectWarning(false);

        // Check code field has entry
        if(searchId !== '') {
            fetchCrew();

            // Code to show above crew list
            setFlightId(searchId);
        } else {
            setDisplayWarning(true);
        }
    }

    const addHandle = () => {
        setDisplayFailure(false);
        setDisplayWarning(false);
        setDisplaySelectWarning(false);

        // Check if crew selected
        if(selectedAvailableCrew) {
            assignCrew();
        } else {
            setDisplaySelectWarning(true);
        }

    }

    const removeHandle = () => {
        setDisplayFailure(false);
        setDisplayWarning(false);
        setDisplaySelectWarning(false);

        // Check if crew selected
        if(selectedFlightCrew) {
            removeCrew();
        } else {
            setDisplaySelectWarning(true);
        }

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

    return (
        <div className='container mt-5 mb-5'>
            <div className='card'>
                <div className='card-header'>
                    Manage crew
                </div>
                <div className='card-body'>
                    <div className='row mb-3'>
                        <div className='col-6'>
                            <div className='d-flex'>
                                <input type='text' className='form-control me-2' id='code' placeholder='Flight ID'
                                       onChange={e => setSearchId(e.target.value)}/>
                                <button className='btn btn-primary' onClick={searchHandle}>
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className='d-flex'>
                                <button className='btn btn-primary flex-fill mx-5' onClick={addHandle}>
                                    Assign
                                </button>
                                <button className='btn btn-primary flex-fill mx-5' onClick={removeHandle}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col-6'>
                            <div className='mt-3 mb-3'>
                                <h5>Crew on flight: {flightId}</h5>
                            </div>
                            {flightCrew.length > 0 ?
                                <>
                                    <div className='list-group'>
                                        {flightCrew.map((person, index) => (
                                            <CrewMember crewMember={person} key={index}
                                                        onClick={() => setSelectedFlightCrew(person)}/>
                                        ))}
                                    </div>
                                </>
                                :
                                <>
                                    <div className='m-5'>
                                        <h5>No crew assigned</h5>
                                    </div>
                                </>
                            }
                        </div>
                        <div className='col-6'>
                            <div className='mt-3 mb-3'>
                                <h5>All available crew</h5>
                            </div>
                            {allCrew.length > 0 ?
                                <>
                                    <div className='list-group'>
                                        {allCrew.map((person, index) => (
                                            <CrewMember crewMember={person} key={index}
                                                        onClick={() => setSelectedAvailableCrew(person)}/>
                                        ))}
                                    </div>
                                </>
                                :
                                <>
                                    <div className='m-5'>
                                        <h5>No crew available</h5>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                    {displayWarning &&
                        <div className='alert alert-danger' role='alert'>
                            Flight code must be entered
                        </div>
                    }
                    {displayFailure &&
                        <div className='alert alert-danger' role='alert'>
                            Error with server
                        </div>
                    }
                    {displaySelectWarning &&
                        <div className='alert alert-danger' role='alert'>
                            No crew selected
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};