import React from 'react';
import './CTA.css';

type CTAProps = {
    onClick: () => void;
    text: string;
    variant?: string;
};

const CTA: React.FC<CTAProps> = ({ onClick, text, variant }) => {
    const ctaWrapperClass = `cta-wrapper ${variant}`;
    const ctaClass = `cta text-amber-50 ${variant}`;

    return (
        <div className={ctaWrapperClass}>
            <button className={ctaClass} onClick={onClick}>{text}</button>
        </div>
    );
};

export default CTA;