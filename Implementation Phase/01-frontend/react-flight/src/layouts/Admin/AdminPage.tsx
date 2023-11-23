import {useState} from "react";
import {ViewFlights} from "./components/ViewFlights";
import {ModifyFlights} from "./components/ModifyFlights";
import {ModifyCrew} from "./components/ModifyCrew";
import {ModifyAircraft} from "./components/ModifyAircraft";

export const AdminPage = () => {

    const [modifyFlight, setModifyFlight] = useState(false);
    const [modifyCrew, setModifyCrew] = useState(false);
    const [modifyAircraft, setModifyAircraft] = useState(false);

    function viewFlightsClickFunction() {
        setModifyFlight(false);
        setModifyCrew(false);
        setModifyAircraft(false);
    }

    function modifyFlightClickFunction() {
        setModifyFlight(true);
        setModifyCrew(false);
        setModifyAircraft(false);
    }

    function modifyCrewClickFunction() {
        setModifyFlight(false);
        setModifyCrew(true);
        setModifyAircraft(false);
    }

    function modifyAircraftClickFunction() {
        setModifyFlight(false);
        setModifyCrew(false);
        setModifyAircraft(true);
    }

    return (
        <div className='container'>
            <div className='mt-5'>
                <h3>Manage Data</h3>
                <nav>
                    <div className='nav nav-tabs' id='nav-tab' role='tablist'>
                        <button onClick={viewFlightsClickFunction} className='nav-link active' id='nav-view-flights-tab'
                                data-bs-toggle='tab' data-bs-target='#nav-view-flights' type='button'
                                role='tab' aria-controls='nav-view-flights' aria-selected='true'>
                            View flights
                        </button>
                        <button onClick={modifyFlightClickFunction} className='nav-link ' id='nav-modify-flight-tab'
                                data-bs-toggle='tab' data-bs-target='#nav-modify-flight' type='button'
                                role='tab' aria-controls='nav-modify-flight' aria-selected='false'>
                            Modify flights
                        </button>
                        <button onClick={modifyCrewClickFunction} className='nav-link ' id='nav-modify-crew-tab'
                                data-bs-toggle='tab' data-bs-target='#nav-modify-crew' type='button'
                                role='tab' aria-controls='nav-modify-crew' aria-selected='false'>
                            Modify crew
                        </button>
                        <button onClick={modifyAircraftClickFunction} className='nav-link ' id='nav-modify-aircraft-tab'
                                data-bs-toggle='tab' data-bs-target='#nav-modify-aircraft' type='button'
                                role='tab' aria-controls='nav-modify-aircraft' aria-selected='false'>
                            Modify aircraft
                        </button>
                    </div>
                </nav>
                <div className='tab-content' id='nav-tabContent'>
                    <div className='tab-pane fade show active' id='nav-view-flights' role='tabpanel'
                         aria-labelledby='nav-view-flights-tab'>
                        <ViewFlights/>
                    </div>
                    <div className='tab-pane fade' id='nav-modify-flight' role='tabpanel'
                         aria-labelledby='nav-modify-flight-tab'>
                        {modifyFlight ? <ModifyFlights/> : <></>}
                    </div>
                    <div className='tab-pane fade' id='nav-modify-crew' role='tabpanel'
                         aria-labelledby='nav-modify-crew-tab'>
                        {modifyCrew ? <ModifyCrew/> : <></>}
                    </div>
                    <div className='tab-pane fade' id='nav-modify-aircraft' role='tabpanel'
                         aria-labelledby='nav-modify-aircraft-tab'>
                        {modifyAircraft ? <ModifyAircraft/> : <></>}
                    </div>
                </div>
            </div>
        </div>
    );
};