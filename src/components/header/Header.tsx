import React from 'react';
import Logo from '../logo/Logo';
import Nav from '../nav/Nav';
import Action from '../action/Action';
import './Header.css';


const Header: React.FC = () => {
    return (
        <div id='header'>
            <Logo />
            <Nav />
            <Action />
        </div>
    );
};

export default Header;