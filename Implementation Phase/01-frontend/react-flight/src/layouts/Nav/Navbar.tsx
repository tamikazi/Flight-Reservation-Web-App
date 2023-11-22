import React from "react";
import {NavLink} from "react-router-dom";

export const Navbar = () => {
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
                            <NavLink className='nav-link' to='/flights'>Flights</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/manifest'>Manifest</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/admin'>Admin</NavLink>
                        </li>
                    </ul>
                    <ul className='navbar-nav ms-auto'>
                        <li className='nav-item m-1'>
                            <NavLink type='button' className='btn btn-outline-light' to='/login'>Sign in</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}