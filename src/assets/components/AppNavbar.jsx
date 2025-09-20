import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from './AppContext';
import ProtectedRoute from './ProtectedRoute';


const AppNavbar = () => {

    const { session, logout } = useAppContext()

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl">Brand Name</a>
            </div>

            {/* Hamburger menu for mobile */}
            <div className="navbar-end lg:hidden">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-30 p-2 shadow right-0"
                    >
                        {/* <li><Link to='/'>Home</Link></li> */}
                        <li><Link to='/about'>About</Link></li>
                        <li><Link to='/contact'>Contact</Link></li>
                        <li><Link to='/reviews'>Reviews</Link></li>
                        {!session && <li><Link to='/login'>Admin Login</Link></li>}
                        {session && <li><Link to='/admin-dashboard'>Admin Dashboard</Link></li>}
                        {session && <li><Link onClick={logout}>Logout</Link></li>}
                    </ul>
                </div>
            </div>

            {/* Desktop menu */}
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {/* <li><Link to='/'>Home</Link></li> */}
                    <li><Link to='/about'>About</Link></li>
                    <li><Link to='/contact'>Contact</Link></li>
                    <li><Link to='/reviews'>Reviews</Link></li>
                    {!session && <li><Link to='/login'>Admin Login</Link></li>}
                    {session && <li><Link to='/admin-dashboard'>Admin Dashboard</Link></li>}
                    {session && <li><Link onClick={logout}>Logout</Link></li>}


                </ul>
            </div>
        </div>
    );
};

export default AppNavbar;
