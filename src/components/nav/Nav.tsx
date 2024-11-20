import React from 'react';
import { Link } from "react-router-dom";
import './Nav.css';

const Nav: React.FC = () => {
    return (
        <div id='nav'>
            <div className='nav-item '>
                <Link to='/' className='text-inherit hover:text-slate-800'>Home</Link>
            </div>
            <div className='nav-item'>
                <Link to='/contact' className='text-inherit hover:text-slate-800'>Contact</Link>
            </div>
            <div className='nav-item'>
                <Link to='/Me' className='text-inherit hover:text-slate-800'>Me</Link>
            </div>
        </div>
    );
};

export default Nav;