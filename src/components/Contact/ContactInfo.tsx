import React from 'react';

const ContactInfo: React.FC = () => {
    return (
        <div className='grid lg:grid-cols-2 gap pt-4'>
            <div className='flex flex-col py-3 border-l-2 border-p-dark p-3'>
                <p className='font-arch capitalize font-semibold'>Johnattan Martinez</p>
                <p className='font-arch capitalize'>Fullstack Developer</p>
                <p className='font-arch capitalize'>01 (52) 55 1137 3263</p>
                <p className='font-arch '>johnattanisraelangeles@gmail.com</p>
                <p className='font-arch '><a href="https://www.linkedin.com/in/johnaangeles/">LinkedIn</a></p>
            </div>
            <div className='flex flex-col py-3 border-l-2 border-p-dark p-3'>
                <p className='font-arch capitalize font-semibold'>Code the world</p>
                
            </div>
        </div>
    );
}

export default ContactInfo;