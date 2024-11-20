import React from 'react';
import './Logo.css';
import eye from '../../assets/eye.svg';

const Logo: React.FC = () => {
    return (
        <div id='logo'>
            <img src={eye} alt="" />
        </div>
    );
};

export default Logo; 