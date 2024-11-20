import React from 'react';
import HeroText from '../hero/HeroText';
import ProjectField from './ProjectFeed';

const  SideFeed: React.FC = () => {
    return (

        <div className='content-wrapper px-5 md:pt-24 sm:pt-11 pb-32'>
            <div className='flex flex-col lg:grid lg:grid-cols-2'>
                <HeroText
                    text='Worked on projects for the following brands'
                    subheading='As UX UI passionate developer I strive for usability in design and code.'
                />
                <ProjectField />
            </div>
        </div>


    );
};

export default SideFeed;