import {useContext, useState} from "react";
import {ViewFlights} from "./components/ViewFlights";
import {ManageFlights} from "./components/ManageFlights";
import {ManageCrew} from "./components/ManageCrew";
import {ManageAircraft} from "./components/ManageAircraft";
import {ManageUsers} from "./components/ManageUsers";
import CurrentUserContext, {Roles} from "../../contexts/CurrentUserContext";
import {ManagePromos} from "./components/ManagePromos";

export const AdminPage = () => {
    const currentUser = useContext(CurrentUserContext);

    const [manageFlights, setManageFlights] = useState(false);
    const [manageCrew, setManageCrew] = useState(false);
    const [manageAircraft, setManageAircraft] = useState(false);
    const [manageUsers, setManageUsers] = useState(false);
    const [managePromos, setManagePromos] = useState(false);

    function viewFlightsClickFunction() {
        setManageFlights(false);
        setManageCrew(false);
        setManageAircraft(false);
        setManageUsers(false);
        setManagePromos(false);
    }

    function manageFlightClickFunction() {
        setManageFlights(true);
        setManageCrew(false);
        setManageAircraft(false);
        setManageUsers(false);
        setManagePromos(false);
    }

    function manageCrewClickFunction() {
        setManageFlights(false);
        setManageCrew(true);
        setManageAircraft(false);
        setManageUsers(false);
        setManagePromos(false);
    }

    function manageAircraftClickFunction() {
        setManageFlights(false);
        setManageCrew(false);
        setManageAircraft(true);
        setManageUsers(false);
        setManagePromos(false);
    }

    function manageUsersClickFunction() {
        setManageFlights(false);
        setManageCrew(false);
        setManageAircraft(false);
        setManageUsers(true);
        setManagePromos(false);
    }

    function managePromosClickFunction() {
        setManageFlights(false);
        setManageCrew(false);
        setManageAircraft(false);
        setManageUsers(false);
        setManagePromos(true);
    }

    return (
        <div className='container mt-5'>
            {currentUser.role == Roles.Admin ?
                <div className='mt-5'>
                    <h3>Manage Data</h3>
                    <nav>
                        <div className='nav nav-tabs' id='nav-tab' role='tablist'>
                            <button onClick={viewFlightsClickFunction} className='nav-link active' id='nav-view-flights-tab'
                                    data-bs-toggle='tab' data-bs-target='#nav-view-flights' type='button'
                                    role='tab' aria-controls='nav-view-flights' aria-selected='true'>
                                View flights
                            </button>
                            <button onClick={manageFlightClickFunction} className='nav-link ' id='nav-modify-flight-tab'
                                    data-bs-toggle='tab' data-bs-target='#nav-modify-flight' type='button'
                                    role='tab' aria-controls='nav-modify-flight' aria-selected='false'>
                                Manage flights
                            </button>
                            <button onClick={manageCrewClickFunction} className='nav-link ' id='nav-modify-crew-tab'
                                    data-bs-toggle='tab' data-bs-target='#nav-modify-crew' type='button'
                                    role='tab' aria-controls='nav-modify-crew' aria-selected='false'>
                                Manage crew
                            </button>
                            <button onClick={manageAircraftClickFunction} className='nav-link ' id='nav-modify-aircraft-tab'
                                    data-bs-toggle='tab' data-bs-target='#nav-modify-aircraft' type='button'
                                    role='tab' aria-controls='nav-modify-aircraft' aria-selected='false'>
                                Manage aircraft
                            </button>
                            <button onClick={manageUsersClickFunction} className='nav-link ' id='nav-modify-users-tab'
                                    data-bs-toggle='tab' data-bs-target='#nav-modify-users' type='button'
                                    role='tab' aria-controls='nav-modify-users' aria-selected='false'>
                                Manage users
                            </button>
                            <button onClick={managePromosClickFunction} className='nav-link ' id='nav-promos-tab'
                                    data-bs-toggle='tab' data-bs-target='#nav-promos' type='button'
                                    role='tab' aria-controls='nav-promos' aria-selected='false'>
                                Manage promos
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
                            {manageFlights ? <ManageFlights/> : <></>}
                        </div>
                        <div className='tab-pane fade' id='nav-modify-crew' role='tabpanel'
                             aria-labelledby='nav-modify-crew-tab'>
                            {manageCrew ? <ManageCrew/> : <></>}
                        </div>
                        <div className='tab-pane fade' id='nav-modify-aircraft' role='tabpanel'
                             aria-labelledby='nav-modify-aircraft-tab'>
                            {manageAircraft ? <ManageAircraft/> : <></>}
                        </div>
                        <div className='tab-pane fade' id='nav-modify-users' role='tabpanel'
                             aria-labelledby='nav-manage-users-tab'>
                            {manageUsers ? <ManageUsers/> : <></>}
                        </div>
                        <div className='tab-pane fade' id='nav-promos' role='tabpanel'
                             aria-labelledby='nav-promos-tab'>
                            {managePromos ? <ManagePromos/> : <></>}
                        </div>
                    </div>
                </div>
            :
                <h3>Authorized access only</h3>
            }

        </div>
    );
};