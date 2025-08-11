import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import LinearGraph from '../data/LinearGraph';

type DataPoint = {
    x: number;
    y: number;
    label: string;
    icon?: string;
};

const Me: React.FC = () => {
    const [data, setData] = React.useState<DataPoint[]>([
        { x: 1, y: 10, label: "Start", icon: "start" },
        { x: 2, y: 3, label: "Growth", icon: "growth" },
        { x: 3, y: 4, label: "Adjust" },
        { x: 4, y: 7, label: "Peak", icon: "peak" }
    ]);

    const sampleData1 = [
        { x: 1, y: 2, label: "Start", icon: "start" },
        { x: 2, y: 4, label: "Growth", icon: "growth" },
        { x: 3, y: 8, label: "Adjust" },
        { x: 4, y: 9, label: "Peak", icon: "peak" }
    ];

    const sampleData2 = [
        { x: 1, y: 8, label: "Start", icon: "start" },
        { x: 2, y: 6, label: "Growth", icon: "growth" },
        { x: 3, y: 7, label: "Adjust" },
        { x: 4, y: 2, label: "Peak", icon: "peak" }
    ];

    const icons = {
        start: "/assets/warning.svg",
        growth: "/assets/warning.svg",
        peak: "/assets/warning.svg"
    };

    return (
        <div className='h-full w-full flex flex-col'>
            <div className='top-0'>
                <Header />
            </div>
            <LinearGraph
                data={data}
                xTickFormat={(d) => `${d}`}
                yTickFormat={(d) => `$${d}K`}
                xTickCount={4}
                yTickCount={10}
                xDomain={[4, 1]}
                yDomain={[0, 10]}
                customIcons={icons}
                xAxisLabel="Weeks"
                yAxisLabel="Score"
                xTickFormat={(d) => `${d} weeks ago`}
                yTickFormat={(d) => `${d}`}
            />

            <button onClick={() => setData(sampleData1)}>Load Sample Data 1</button>
            <button onClick={() => setData(sampleData2)}>Load Sample Data 2</button>

            <Footer />


        </div>
    );
};

export default Me;