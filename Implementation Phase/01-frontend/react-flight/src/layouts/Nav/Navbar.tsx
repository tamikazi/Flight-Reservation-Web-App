import React, {useContext} from "react";
import {NavLink} from "react-router-dom";
import CurrentUserContext, {Roles} from "../../contexts/CurrentUserContext";

export const Navbar: React.FC<{ setUser: any }> = (props) => {
    const currentUser = useContext(CurrentUserContext);

    // Reset to guest
    const handleLogout = () => {
        props.setUser({ userId: -1, role: Roles.Guest })
    }

    return (
        <nav className='navbar navbar-expand-lg navbar-dark main-color py-1'>
            <div className='container-fluid'>
                <span className='navbar-brand'>ENSF614Project</span>
                <button className='navbar-toggler' type='button'
                        data-bs-toggle='collapse' data-bs-target='#navbarNavDropdown'
                        aria-controls='navbarNavDropdown' aria-expanded='false'
                        aria-label='Toggle Navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNavDropdown'>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/search'>Flights</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/manifest'>Manifest</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/bookings'>Bookings</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/history'>Receipts</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/admin'>Admin</NavLink>
                        </li>
                    </ul>
                    <ul className='navbar-nav ms-auto'>
                        {currentUser.role === Roles.Guest ?
                            <li className='nav-item m-1'>
                                <NavLink type='button' className='btn btn-outline-light' to='/login'>Sign in</NavLink>
                            </li>
                            :
                            <>
                                <li className='nav-item m-1'>
                                    <button className='btn btn-outline-light' onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}