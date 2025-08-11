import React, { useState } from 'react';
import * as d3 from 'd3';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import LinearGraph from '../data/LinearGraph';

type DataPoint = {
    x: number;
    y: number;
    label: string;
    icon?: string;
};

type LineData = {
    id: string;
    name: string;
    data: DataPoint[];
    color?: string;
    pointColor?: string;
};

type TimePeriod = 'days' | 'weeks' | 'months';

const Me: React.FC = () => {
    const [timePeriod, setTimePeriod] = useState<TimePeriod>('weeks');
    const [currentDataset, setCurrentDataset] = useState<string>('dataset1');

    const icons = {
        start: "/assets/warning.svg",
        growth: "/assets/warning.svg",
        peak: "/assets/warning.svg"
    };

    // Sample data for different time periods and datasets
    const sampleDatasets = {
        dataset1: {
            days: [
                {
                    id: 'performance',
                    name: 'Performance',
                    color: '#F9CA00',
                    pointColor: '#183140',
                    data: [
                        { x: 1, y: 85, label: "Day 1", icon: "start" },
                        { x: 2, y: 92, label: "Day 2", icon: "growth" },
                        { x: 3, y: 78, label: "Day 3" },
                        { x: 4, y: 95, label: "Day 4", icon: "peak" },
                        { x: 5, y: 88, label: "Day 5" },
                        { x: 6, y: 91, label: "Day 6" },
                        { x: 7, y: 97, label: "Day 7", icon: "peak" }
                    ]
                },
                {
                    id: 'engagement',
                    name: 'Engagement',
                    color: '#e74c3c',
                    pointColor: '#c0392b',
                    data: [
                        { x: 1, y: 65, label: "Day 1" },
                        { x: 2, y: 72, label: "Day 2" },
                        { x: 3, y: 68, label: "Day 3" },
                        { x: 4, y: 85, label: "Day 4" },
                        { x: 5, y: 79, label: "Day 5" },
                        { x: 6, y: 82, label: "Day 6" },
                        { x: 7, y: 87, label: "Day 7" }
                    ]
                }
            ],
            weeks: [
                {
                    id: 'performance',
                    name: 'Performance',
                    color: '#F9CA00',
                    pointColor: '#183140',
                    data: [
                        { x: 1, y: 10, label: "Week 1", icon: "start" },
                        { x: 2, y: 3, label: "Week 2", icon: "growth" },
                        { x: 3, y: 4, label: "Week 3" },
                        { x: 4, y: 7, label: "Week 4", icon: "peak" }
                    ]
                },
                {
                    id: 'engagement',
                    name: 'Engagement',
                    color: '#e74c3c',
                    pointColor: '#c0392b',
                    data: [
                        { x: 1, y: 8, label: "Week 1" },
                        { x: 2, y: 5, label: "Week 2" },
                        { x: 3, y: 6, label: "Week 3" },
                        { x: 4, y: 9, label: "Week 4" }
                    ]
                }
            ],
            months: [
                {
                    id: 'performance',
                    name: 'Performance',
                    color: '#F9CA00',
                    pointColor: '#183140',
                    data: [
                        { x: 1, y: 45, label: "Jan", icon: "start" },
                        { x: 2, y: 52, label: "Feb" },
                        { x: 3, y: 48, label: "Mar", icon: "growth" },
                        { x: 4, y: 65, label: "Apr" },
                        { x: 5, y: 72, label: "May" },
                        { x: 6, y: 68, label: "Jun", icon: "peak" }
                    ]
                },
                {
                    id: 'engagement',
                    name: 'Engagement',
                    color: '#e74c3c',
                    pointColor: '#c0392b',
                    data: [
                        { x: 1, y: 35, label: "Jan" },
                        { x: 2, y: 42, label: "Feb" },
                        { x: 3, y: 38, label: "Mar" },
                        { x: 4, y: 55, label: "Apr" },
                        { x: 5, y: 62, label: "May" },
                        { x: 6, y: 58, label: "Jun" }
                    ]
                }
            ]
        },
        dataset2: {
            days: [
                {
                    id: 'performance',
                    name: 'Performance',
                    color: '#2ecc71',
                    pointColor: '#27ae60',
                    data: [
                        { x: 1, y: 75, label: "Day 1" },
                        { x: 2, y: 82, label: "Day 2" },
                        { x: 3, y: 88, label: "Day 3" },
                        { x: 4, y: 85, label: "Day 4" },
                        { x: 5, y: 92, label: "Day 5" },
                        { x: 6, y: 89, label: "Day 6" },
                        { x: 7, y: 95, label: "Day 7" }
                    ]
                },
                {
                    id: 'engagement',
                    name: 'Engagement',
                    color: '#9b59b6',
                    pointColor: '#8e44ad',
                    data: [
                        { x: 1, y: 55, label: "Day 1" },
                        { x: 2, y: 62, label: "Day 2" },
                        { x: 3, y: 68, label: "Day 3" },
                        { x: 4, y: 75, label: "Day 4" },
                        { x: 5, y: 82, label: "Day 5" },
                        { x: 6, y: 79, label: "Day 6" },
                        { x: 7, y: 85, label: "Day 7" }
                    ]
                }
            ],
            weeks: [
                {
                    id: 'performance',
                    name: 'Performance',
                    color: '#2ecc71',
                    pointColor: '#27ae60',
                    data: [
                        { x: 1, y: 2, label: "Week 1", icon: "start" },
                        { x: 2, y: 4, label: "Week 2", icon: "growth" },
                        { x: 3, y: 8, label: "Week 3" },
                        { x: 4, y: 9, label: "Week 4", icon: "peak" }
                    ]
                },
                {
                    id: 'engagement',
                    name: 'Engagement',
                    color: '#9b59b6',
                    pointColor: '#8e44ad',
                    data: [
                        { x: 1, y: 1, label: "Week 1" },
                        { x: 2, y: 3, label: "Week 2" },
                        { x: 3, y: 6, label: "Week 3" },
                        { x: 4, y: 7, label: "Week 4" }
                    ]
                }
            ],
            months: [
                {
                    id: 'performance',
                    name: 'Performance',
                    color: '#2ecc71',
                    pointColor: '#27ae60',
                    data: [
                        { x: 1, y: 55, label: "Jan" },
                        { x: 2, y: 62, label: "Feb" },
                        { x: 3, y: 58, label: "Mar" },
                        { x: 4, y: 75, label: "Apr" },
                        { x: 5, y: 82, label: "May" },
                        { x: 6, y: 78, label: "Jun" }
                    ]
                },
                {
                    id: 'engagement',
                    name: 'Engagement',
                    color: '#9b59b6',
                    pointColor: '#8e44ad',
                    data: [
                        { x: 1, y: 45, label: "Jan" },
                        { x: 2, y: 52, label: "Feb" },
                        { x: 3, y: 48, label: "Mar" },
                        { x: 4, y: 65, label: "Apr" },
                        { x: 5, y: 72, label: "May" },
                        { x: 6, y: 68, label: "Jun" }
                    ]
                }
            ]
        }
    };

    const getCurrentData = (): LineData[] => {
        return sampleDatasets[currentDataset as keyof typeof sampleDatasets][timePeriod];
    };

    const getAxisLabel = (period: TimePeriod): string => {
        const labels = {
            days: 'Days',
            weeks: 'Weeks',
            months: 'Months'
        };
        return labels[period];
    };

    const getTickFormat = (period: TimePeriod) => {
        const formats = {
            days: (d: d3.NumberValue) => `Day ${Number(d)}`,
            weeks: (d: d3.NumberValue) => `Week ${Number(d)}`,
            months: (d: d3.NumberValue) => {
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                return months[Number(d) - 1] || `Month ${Number(d)}`;
            }
        };
        return formats[period];
    };

    return (
        <div className='h-full w-full flex flex-col'>
            <div className='top-0'>
                <Header />
            </div>
            
            <div className="p-6">
                {/* Time Period Selection */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Time Period:</h3>
                    <div className="flex gap-3">
                        {(['days', 'weeks', 'months'] as TimePeriod[]).map((period) => (
                            <button
                                key={period}
                                onClick={() => setTimePeriod(period)}
                                className={`px-4 py-2 rounded font-medium transition-colors ${
                                    timePeriod === period
                                        ? 'bg-p-yellow text-p-dark'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                {period.charAt(0).toUpperCase() + period.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Dataset Selection */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Dataset:</h3>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setCurrentDataset('dataset1')}
                            className={`px-4 py-2 rounded font-medium transition-colors ${
                                currentDataset === 'dataset1'
                                    ? 'bg-p-yellow text-p-dark'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            Dataset 1
                        </button>
                        <button
                            onClick={() => setCurrentDataset('dataset2')}
                            className={`px-4 py-2 rounded font-medium transition-colors ${
                                currentDataset === 'dataset2'
                                    ? 'bg-p-yellow text-p-dark'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            Dataset 2
                        </button>
                    </div>
                </div>

                {/* Graph Legend */}
                <div className="mb-4">
                    <div className="flex gap-6">
                        {getCurrentData().map((line) => (
                            <div key={line.id} className="flex items-center gap-2">
                                <div 
                                    className="w-4 h-0.5" 
                                    style={{ backgroundColor: line.color }}
                                ></div>
                                <span className="text-sm font-medium">{line.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Linear Graph */}
                <LinearGraph
                    lines={getCurrentData()}
                    width={800}
                    height={400}
                    customIcons={icons}
                    xAxisLabel={getAxisLabel(timePeriod)}
                    yAxisLabel="Score"
                    xTickFormat={getTickFormat(timePeriod)}
                    yTickFormat={(d) => `${Number(d)}`}
                    showGrid={true}
                />
            </div>

            <Footer />
        </div>
    );
};

export default Me;