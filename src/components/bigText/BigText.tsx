import React from 'react';
import './BigText.css';

type BigTextProps = {
    text: string;
};

const BigText: React.FC<BigTextProps> = ({ text }) => {
    return (
        <div className="big-text-wrapper">
            <h2>{text}</h2>
        </div>
    );
};

export default BigText;