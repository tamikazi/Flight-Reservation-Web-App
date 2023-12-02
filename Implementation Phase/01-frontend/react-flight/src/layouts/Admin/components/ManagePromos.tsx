import {Flight} from "../../Flights/components/Flight";
import AircraftRequestView from "../../../models/AircraftRequestView";
import React, {useState} from "react";

export const ManagePromos = () => {

    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);


    async function sendPromos() {
        try {
            const url = `http://localhost:8080/api/newsletter/send`;

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            };

            const updateResponse = await fetch(url, requestOptions);

            if(!updateResponse.ok) {
                setDisplayWarning(true);
                return;
            } else {
                setDisplayWarning(false);
                setDisplaySuccess(true);
            }
        } catch (error) {
            setDisplayWarning(true);
        }
    }

    return(
        <div className='container mt-5 mb-5'>
            <div className='card'>
                <div className='card-header'>
                    Manage Promos
                </div>
                <div className='card-body'>
                    <div className='row mb-3'>
                        <div className='col-6'>
                            <h5>Send newsletter</h5>
                            <button className='btn btn-primary'
                                    onClick={sendPromos}>
                                Send
                            </button>
                        </div>
                    </div>
                    {displayWarning &&
                        <div className='col-6 alert alert-danger' role='alert'>
                            Server error
                        </div>
                    }
                    {displaySuccess &&
                        <div className='col-6 alert alert-success' role='alert'>
                            Send successful
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};