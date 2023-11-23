import {Passenger} from "../../Manifest/components/Passenger";
import {useEffect, useState} from "react";
import {SpinnerLoading} from "../../Utils/SpinnerLoading";
import CrewModel from "../../../models/CrewModel";
import {CrewMember} from "./CrewMember";

export const ModifyCrew = () => {

    const [crew, setCrew] = useState<CrewModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [searchUrl, setSearchUrl] = useState('');

    useEffect(() => {
        const fetchCrew = async () => {
            // const baseUrl: string = "http://localhost:8080/api/flights";
            //
            // let url: string;
            //
            // if (searchUrl === '') {
            //     url = `${baseUrl}`;
            // } else {
            //     url = `${baseUrl}${searchUrl}`;
            // }
            //
            // const response = await fetch(url);
            //
            // if (!response.ok) {
            //     throw new Error('Something went wrong!');
            // }
            //
            // const responseData = await response.json();
            //
            // const loadedFlights: FlightModel[] = [];
            //
            // for (const key in responseData) {
            //     loadedFlights.push({
            //         flightId: responseData[key].flightId,
            //         code: responseData[key].code,
            //         origin: responseData[key].origin,
            //         destination: responseData[key].destination,
            //         date: responseData[key].date,
            //         aircraft: responseData[key].aircraft
            //     });
            // }

            // Generate random names
            const loadedCrew: CrewModel[] = [];
            loadedCrew.push({name:'Ann Smith'});
            loadedCrew.push({name:'Bob Wong'});
            loadedCrew.push({name:'Charlie Puck'});
            loadedCrew.push({name:'Danny Bob'});
            loadedCrew.push({name:'Erica Stevens'});


            setCrew(loadedCrew);
            setIsLoading(false);
        };
        fetchCrew().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, [searchUrl]);

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
                    Modify crew
                </div>
                <div className='card-body'>
                    <div className='row mt-5 mb-5'>
                        <div className='col-6'>
                            <div className='d-flex'>
                                <input type='text' className='form-control me-2' id='code' placeholder='Flight code'/>
                                <button className='btn btn-primary'
                                        onClick={() => {}}>
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className='d-flex'>
                                <input type='text' className='form-control me-2' id='name' placeholder='Crew name'/>
                                <button className='btn btn-primary'
                                        onClick={() => {}}>
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        {crew.length > 0 ?
                            <>
                                <div className='list-group'>
                                    {crew.map((person, index) => (
                                        <CrewMember crewMember={person} key={index}/>
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
                        <button className='btn btn-primary mt-3' onClick={() => {}}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};