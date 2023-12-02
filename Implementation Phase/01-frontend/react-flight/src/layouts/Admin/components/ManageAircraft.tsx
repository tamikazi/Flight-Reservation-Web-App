import React, {useEffect, useState} from "react";
import {SpinnerLoading} from "../../Utils/SpinnerLoading";
import AircraftView from "../../../models/AircraftView";
import {Aircraft} from "./cards/Aircraft";
import AircraftRequestView from "../../../models/AircraftRequestView";

export const ManageAircraft = () => {

    const [model, setModel] = useState('');
    const [rows, setRows] = useState(0);
    const [columns, setColumns] = useState(0);

    const [aircraft, setAircraft] = useState<AircraftView[]>([]);
    const [selectedAircraft, setSelectedAircraft] = useState<AircraftView|null>(null);
    const [aircraftUpdated, setAircraftUpdated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    const [displayWarning, setDisplayWarning] = useState(false);
    const [failureWarning, setFailureWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    useEffect(() => {
        const fetchAircraft = async () => {
            const url: string = "http://localhost:8080/api/admin/aircrafts/all";

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseData = await response.json();

            const loadedAircraft: AircraftView[] = [];

            for (const key in responseData) {
                loadedAircraft.push({
                    aircraftID: responseData[key].aircraftID,
                    model: responseData[key].model,
                    numCols: responseData[key].numCols,
                    numRows: responseData[key].numRows
                });
            }

            setAircraft(loadedAircraft);
            setIsLoading(false);
        };
        fetchAircraft().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, [aircraftUpdated]);

    async function addAircraft() {
        try {
            const url = `http://localhost:8080/api/admin/aircrafts/add`;

            const userRequest = new AircraftRequestView(model, columns, rows);

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userRequest)
            };

            const updateResponse = await fetch(url, requestOptions);

            if(!updateResponse.ok) {
                setFailureWarning(true);
                return;
            } else {
                setFailureWarning(false);
                setDisplaySuccess(true);
                setAircraftUpdated(!aircraftUpdated);
            }
        } catch (error) {
            setFailureWarning(true);
        }
    }

    async function deleteAircraft() {
        if(selectedAircraft) {
            const url = `http://localhost:8080/api/admin/aircrafts/delete/${selectedAircraft?.aircraftID}`;
            const requestOptions = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const updateResponse = await fetch(url, requestOptions);
            if (!updateResponse.ok) {
                throw new Error('Something went wrong!');
            }

            setSelectedAircraft(null);

            // Trigger fetching all bookings
            setAircraftUpdated(!aircraftUpdated);
        }
    }

    const addHandle = () => {
        setDisplayWarning(false);
        setFailureWarning(false);
        setDisplaySuccess(false);
        if(model !== '' && rows !== 0 && columns !== 0) {
            addAircraft();
        } else {
            setDisplayWarning(true);
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
                    Manage aircraft
                </div>
                <div className='card-body'>
                    <form>
                        <div className='row g-3 mb-5'>
                            <div className='col-4'>
                                <label htmlFor='model' className='form-label'>Aircraft Model</label>
                                <input type='text' className='form-control' id='model'
                                       onChange={e => setModel(e.target.value)}/>
                            </div>
                            <div className='col-4'>
                                <label htmlFor='rows' className='form-label'>Rows of Seats</label>
                                <input type='number' className='form-control' id='rows'
                                       onChange={e => setRows(Number(e.target.value))}/>
                            </div>
                            <div className='col-4'>
                                <label htmlFor='columns' className='form-label'>Columns of Seats</label>
                                <input type='number' className='form-control' id='columns'
                                       onChange={e => setColumns(Number(e.target.value))}/>
                            </div>
                            <div className='col-6'>
                                <button className='btn btn-primary' type='button' onClick={addHandle}>
                                    Add
                                </button>
                            </div>
                            {displayWarning &&
                                <div className='col-6 alert alert-danger' role='alert'>
                                    All fields must be filled in
                                </div>
                            }
                            {failureWarning &&
                                <div className='col-6 alert alert-danger' role='alert'>
                                    Failed to add aircraft
                                </div>
                            }
                            {displaySuccess &&
                                <div className='col-6 alert alert-success' role='alert'>
                                    Registration successful
                                </div>
                            }
                        </div>
                    </form>
                    <div>
                        {aircraft.length > 0 ?
                            <>
                                <div className='list-group'>
                                    {aircraft.map((aircraft, index) => (
                                        <Aircraft aircraft={aircraft} key={index}
                                                  select={() => setSelectedAircraft(aircraft)}/>
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
                        <button className='btn btn-primary mt-3' onClick={deleteAircraft}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};