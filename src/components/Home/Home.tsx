import React from 'react';
import Header from '../header/Header';
import Hero from '../hero/Hero';
import CTA from '../cta/CTA';
import SideFeed from '../projectFeed/SideFeed';
import programer1 from '../../assets/program-1.svg';
import programer2 from '../../assets/program-2.svg';
import Footer from '../footer/Footer';
import Feature from '../feature/Feature';
import ContentGrid from '../grid/ContentGrid';
import HeroText from '../hero/HeroText';
import Modal from '../Modal/Modal';
import GridSmallCard from '../grid/GridSmallCard';
import GridBigCard from '../grid/GridBigCard';
import Lamda from '../../assets/Lambda.svg';
import cypress from '../../assets/cypress.svg';
import jest from '../../assets/jest.svg';

const Home: React.FC = () => {

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = '/Johnattan_Martinez_Fullstack_Developer.pdf';
        link.download = 'Johnattan_Martinez_Fullstack_Developer.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const firstCards = () => (
        <>
            <GridSmallCard
                text="HTML5"
                imageSrc="https://img.icons8.com/color/96/000000/html-5.png"
                classNames="flex flex-col text-sm sm:text-xl md:text-2xl min-h-36 p-2 sm:p-4 rounded-lg bg-cyan-300 dark:bg-cyan-800 dark:text-cyan-400 justify-center align-middle"
            />
            <GridSmallCard
                text="CSS"
                imageSrc="https://img.icons8.com/color/96/000000/css3.png"
                classNames="flex flex-col text-sm sm:text-xl md:text-2xl min-h-36 p-2 sm:p-4 rounded-lg bg-cyan-300 dark:bg-cyan-800 dark:text-cyan-400 justify-center align-middle"
            />
            <GridSmallCard
                text="Javascript"
                imageSrc="https://img.icons8.com/color/96/000000/javascript.png"
                classNames="flex flex-col text-sm sm:text-xl md:text-2xl min-h-36 p-2 sm:p-4 rounded-lg bg-cyan-300 dark:bg-cyan-800 dark:text-cyan-400 justify-center align-middle"
            />
            <GridBigCard
                text="React"
                imageSrc="https://img.icons8.com/color/96/000000/react-native.png"
                classNames="flex flex-col text-2xl sm:text-3xl min-h-36 p-4 rounded-lg shadow-lg bg-cyan-500 col-span-2"
            />
            <GridSmallCard
                text="Typescript"
                imageSrc='https://img.icons8.com/color/96/000000/typescript.png'
                classNames='flex flex-col text-sm sm:text-xl md:text-2xl min-h-36 p-2 sm:p-4 rounded-lg bg-cyan-300 dark:bg-cyan-800 dark:text-cyan-400 justify-center align-middle'
            />
            <GridSmallCard
                text="Git"
                imageSrc='https://img.icons8.com/color/96/000000/git.png'
                classNames='flex flex-col text-sm sm:text-xl md:text-2xl min-h-36 p-2 sm:p-4 rounded-lg bg-cyan-300 dark:bg-cyan-800 dark:text-cyan-400 justify-center align-middle'
            />
            <GridBigCard
                text="AWS Serverless Framework"
                imageSrc="https://img.icons8.com/color/96/000000/amazon-web-services.png"
                classNames="flex flex-col text-2xl sm:text-3xl min-h-36 p-4 rounded-lg shadow-lg bg-cyan-500 col-span-2"
            />
        </>
    );

    const secondCards = () => (
        <>
                    <GridSmallCard
                text="Python"
                imageSrc="https://img.icons8.com/color/96/000000/python.png"
                classNames="flex flex-col text-sm sm:text-xl md:text-2xl min-h-36 p-2 sm:p-4 rounded-lg bg-cyan-300 dark:bg-cyan-800 dark:text-cyan-400 justify-center align-middle"
            />
            <GridSmallCard
                text="Redux"
                imageSrc="https://img.icons8.com/color/96/000000/redux.png"
                classNames="flex flex-col text-sm sm:text-xl md:text-2xl min-h-36 p-2 sm:p-4 rounded-lg bg-cyan-300 dark:bg-cyan-800 dark:text-cyan-400 justify-center align-middle"
            />
            <GridSmallCard
                text="AWS Lambda"
                imageSrc={Lamda}
                classNames="flex flex-col text-sm sm:text-xl md:text-2xl min-h-36 p-2 sm:p-4 rounded-lg bg-cyan-300 dark:bg-cyan-800 dark:text-cyan-400 justify-center align-middle"
            />
            <GridSmallCard
                text="Node JS"
                imageSrc="https://img.icons8.com/color/96/000000/nodejs.png"
                classNames="flex flex-col text-sm sm:text-xl md:text-2xl min-h-36 p-2 sm:p-4 rounded-lg bg-cyan-300 dark:bg-cyan-800 dark:text-cyan-400 justify-center align-middle"
            />
            <GridBigCard
                text="SQL"
                imageSrc="https://img.icons8.com/color/96/000000/mysql-logo.png"
                classNames="flex flex-col text-2xl sm:text-3xl min-h-36 p-4 rounded-lg shadow-lg bg-cyan-500 col-span-2"
            />
            <GridSmallCard
                text="Cypress"
                imageSrc={cypress}
                classNames="flex flex-col text-sm sm:text-xl md:text-2xl min-h-36 p-2 sm:p-4 rounded-lg bg-cyan-300 dark:bg-cyan-800 dark:text-cyan-400"
            />
            <GridSmallCard
                text="Jest"
                imageSrc={jest}
                classNames="flex flex-col text-sm sm:text-xl md:text-2xl min-h-36 p-2 sm:p-4 rounded-lg bg-cyan-300 dark:bg-cyan-800 dark:text-cyan-400"
            />
            <GridSmallCard
                text="Webpack"
                imageSrc="https://img.icons8.com/color/96/000000/webpack.png"
                classNames="flex flex-col text-sm sm:text-xl md:text-2xl min-h-36 p-2 sm:p-4 rounded-lg bg-cyan-300 dark:bg-cyan-800 dark:text-cyan-400"
            />
        </>
    )

    return (
        <>
            <Header />
            <Hero
                imgSrc={programer1}
                variant='a'
                text='Code the world a better place.'
            />

            <Modal />

            <CTA
                onClick={handleDownload}
                text='Download my resume'
            />

            <SideFeed />

            <Feature />
            <div className='flex flex-col w-full justify-center gap-4 items-center'>
                <HeroText
                    text='The stack I use everyday for Full Stack Development'
                    subheading='I consider myself technology agnostic, but here are some of the tools I use.'
                    style='pb-16'
                />
                <ContentGrid
                    cards={firstCards()}
                />
                <HeroText
                    text='Other technologies I have experience with'
                    subheading='I am always learning new things. Here are some other tools I also use.'
                    style='pb-16'
                />
                <ContentGrid
                    cards={secondCards()}
                />
            </div>

            <Hero
                imgSrc={programer2}
                variant='b'
                text='Code the world a safer place.'
            />

            <CTA
                onClick={handleDownload}
                text='Download my resume'
            />

            <Footer />
        </>
    );
};

export default Home;