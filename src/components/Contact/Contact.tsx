import React from 'react';
import Header from '../header/Header';
import HeroText from '../hero/HeroText';
import Footer from '../footer/Footer';
import ContactInfo from './ContactInfo';

const Contact: React.FC = () => {
    return (
        <div className='h-full w-full flex flex-col'>
            <Header />
            <HeroText
                text='Get in touch'
                subheading='I am open to new opportunities and collaborations. Feel free to reach out.'
                style='pb-16 pt-16'
            />
            <ContactInfo />
            <Footer />
        </div>
    );
};

export default Contact;