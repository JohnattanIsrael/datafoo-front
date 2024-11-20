import React from 'react';

interface GridCardProps {
    imageSrc: string;
    classNames?: string;
    text: string;
}

const GridSmallCard: React.FC<GridCardProps> = ({ imageSrc, classNames = '', text }) => {
    return (
        <div className={`flex flex-col text-sm sm:text-xl md:text-2xl min-h-36 sm:min-h-28 p-2 sm:p-4 rounded-lg bg-cyan-300 dark:bg-cyan-800 dark:text-cyan-400 ${classNames}`}>
            {text}
            <div className='h-full w-full flex justify-center align-middle'>
                <img src={imageSrc} className="h-16 w-16" alt={text} />
            </div>
        </div>
    );
};

export default GridSmallCard;