import React from 'react';

interface ContentGridProps {
    cards: React.ReactNode;
}

const ContentGrid: React.FC<ContentGridProps> = ({ cards }) => {
    return (
        <div className='sm:w-10/12 md:w-full lg:w-full xl:w-full not-prose relative bg-cyan-50 rounded-xl overflow-hidden dark:bg-cyan-200/25'>
            <div className='absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]' />
            <div className='relative rounded-xl overflow-auto p-1 sm:p-8 md:p-8'>
                <div className="grid grid-cols-3 gap-4 font-mono text-white text-sm text-center font-bold leading-6">
                    {cards}
                </div>
            </div>
        </div>
    );
};

export default ContentGrid;