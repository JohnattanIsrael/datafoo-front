import React from 'react';
import './Hero.css';

interface HeroProps {
    imgSrc: string;
    variant: 'a' | 'b';
    text: string;
}

const Hero: React.FC<HeroProps> = ({ imgSrc, variant, text}) => {
    const heroClass = `hero-container hero-${variant}`;

    return (
        <div className={heroClass}>
            <div className={`hero-img hero-img-${variant}`}>
                <img src={imgSrc} alt='hero' />
            </div>

            <h1 className={`hero-text-1 hero-text-${variant}`}>{text}</h1>
            <h1 className={`hero-text-2 hero-text-${variant}`}>{text}</h1>
        </div>
    );
};

export default Hero;