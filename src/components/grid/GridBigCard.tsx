import React from 'react';

interface GridBigCardProps {
    imageSrc: string;
    text: string;
    classNames?: string;
}

const GridBigCard: React.FC<GridBigCardProps> = ({ imageSrc, text, classNames = '' }) => {
    return (
        <div className={`flex flex-col text-2xl sm:text-3xl min-h-36 p-4 rounded-lg shadow-lg bg-cyan-500 col-span-2 ${classNames}`}>
            {text}
            <div className='h-full w-full flex justify-center align-middle'>
                <img src={imageSrc} className="h-16 w-16" alt="icon" />
            </div>
        </div>
    );
};

export default GridBigCard;