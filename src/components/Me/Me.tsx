import React from 'react';
import Header from '../header/Header';
import HeroText from '../hero/HeroText';

import Footer from '../footer/Footer';

const Me: React.FC = () => {
    return (
        <div className='h-full w-full flex flex-col'>
            <div className='top-0'>
              <Header />
            </div>
            
            <HeroText
                text='Get in touch'
                subheading='I am open to new opportunities and collaborations. Feel free to reach out.'
                style='pb-16 pt-16'
            />
            <h3 className='font-arch '><a href="https://www.linkedin.com/in/johnaangeles/">LinkedIn</a></h3>
            <Footer />
        
            
        </div>
    );
};

export default Me;