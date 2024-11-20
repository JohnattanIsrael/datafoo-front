import React from 'react';
import './Card.css';

interface CardProps {
    content: string;
}

const Card: React.FC<CardProps> = ({ content }) => {
    return (
        <div className="card-item">
            {content}
        </div>
    );
};

export default Card;