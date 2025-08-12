import React, { useState } from 'react';
import * as d3 from 'd3';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import LinearGraph from '../data/LinearGraph';
import RechartsLineGraph from '../data/RechartsLineGraph';
import VisxLineGraph from '../data/VisxLineGraph';

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

// Visx data types
type VisxDataPoint = {
    x: number;
    y: number;
    label?: string;
};

type VisxLineData = {
    id: string;
    name: string;
    color?: string;
    strokeWidth?: number;
    strokeDasharray?: string;
    showDots?: boolean;
    dotRadius?: number;
    data: VisxDataPoint[];
};

// Line visibility state type
type LineVisibility = {
    [key: string]: boolean;
};

// Recharts data types
type RechartsDataPoint = {
    x: number;
    performance?: number;
    engagement?: number;
    satisfaction?: number;
    label?: string;
};

type RechartsLineData = {
    id: string;
    name: string;
    dataKey: string;
    color?: string;
    strokeWidth?: number;
    strokeDasharray?: string;
};

const Me: React.FC = () => {
    // D3 LinearGraph state
    const [timePeriod, setTimePeriod] = useState<TimePeriod>('weeks');
    const [currentDataset, setCurrentDataset] = useState<string>('dataset1');
    
    // Recharts state (separate from D3 state)
    const [rechartsTimePeriod, setRechartsTimePeriod] = useState<TimePeriod>('days');
    const [rechartsDataset, setRechartsDataset] = useState<string>('dataset1');
    
    // Visx state (separate from D3 and Recharts state)
    const [visxTimePeriod, setVisxTimePeriod] = useState<TimePeriod>('months');
    const [visxDataset, setVisxDataset] = useState<string>('dataset1');
    
    // Line visibility states for all three chart types
    const [d3LineVisibility, setD3LineVisibility] = useState<LineVisibility>({
        performance: true,
        engagement: true,
        satisfaction: true
    });
    const [rechartsLineVisibility, setRechartsLineVisibility] = useState<LineVisibility>({
        performance: true,
        engagement: true,
        satisfaction: true
    });
    const [visxLineVisibility, setVisxLineVisibility] = useState<LineVisibility>({
        performance: true,
        engagement: true,
        satisfaction: true,
        efficiency: true,
        quality: true
    });

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

    // Recharts-specific data and functions
    const rechartsDatasets = {
        dataset1: {
            days: [
                {
                    id: 'performance',
                    name: 'Performance',
                    dataKey: 'performance',
                    color: '#F9CA00',
                    strokeWidth: 3
                },
                {
                    id: 'engagement',
                    name: 'Engagement',
                    dataKey: 'engagement',
                    color: '#e74c3c',
                    strokeWidth: 2
                },
                {
                    id: 'satisfaction',
                    name: 'Satisfaction',
                    dataKey: 'satisfaction',
                    color: '#3498db',
                    strokeWidth: 2,
                    strokeDasharray: '5 5'
                }
            ],
            weeks: [
                {
                    id: 'performance',
                    name: 'Performance',
                    dataKey: 'performance',
                    color: '#F9CA00',
                    strokeWidth: 3
                },
                {
                    id: 'engagement',
                    name: 'Engagement',
                    dataKey: 'engagement',
                    color: '#e74c3c',
                    strokeWidth: 2
                }
            ],
            months: [
                {
                    id: 'performance',
                    name: 'Performance',
                    dataKey: 'performance',
                    color: '#F9CA00',
                    strokeWidth: 4
                },
                {
                    id: 'engagement',
                    name: 'Engagement',
                    dataKey: 'engagement',
                    color: '#e74c3c',
                    strokeWidth: 3
                },
                {
                    id: 'satisfaction',
                    name: 'Satisfaction',
                    dataKey: 'satisfaction',
                    color: '#3498db',
                    strokeWidth: 2
                }
            ]
        },
        dataset2: {
            days: [
                {
                    id: 'performance',
                    name: 'Performance',
                    dataKey: 'performance',
                    color: '#2ecc71',
                    strokeWidth: 3
                },
                {
                    id: 'engagement',
                    name: 'Engagement',
                    dataKey: 'engagement',
                    color: '#9b59b6',
                    strokeWidth: 2
                },
                {
                    id: 'satisfaction',
                    name: 'Satisfaction',
                    dataKey: 'satisfaction',
                    color: '#f39c12',
                    strokeWidth: 2,
                    strokeDasharray: '3 3'
                }
            ],
            weeks: [
                {
                    id: 'performance',
                    name: 'Performance',
                    dataKey: 'performance',
                    color: '#2ecc71',
                    strokeWidth: 3
                },
                {
                    id: 'engagement',
                    name: 'Engagement',
                    dataKey: 'engagement',
                    color: '#9b59b6',
                    strokeWidth: 2
                }
            ],
            months: [
                {
                    id: 'performance',
                    name: 'Performance',
                    dataKey: 'performance',
                    color: '#2ecc71',
                    strokeWidth: 4
                },
                {
                    id: 'engagement',
                    name: 'Engagement',
                    dataKey: 'engagement',
                    color: '#9b59b6',
                    strokeWidth: 3
                },
                {
                    id: 'satisfaction',
                    name: 'Satisfaction',
                    dataKey: 'satisfaction',
                    color: '#f39c12',
                    strokeWidth: 2
                }
            ]
        }
    };

    const rechartsData = {
        dataset1: {
            days: [
                { x: 1, performance: 78, engagement: 85, satisfaction: 82, label: "Day 1" },
                { x: 2, performance: 85, engagement: 88, satisfaction: 79, label: "Day 2" },
                { x: 3, performance: 92, engagement: 82, satisfaction: 85, label: "Day 3" },
                { x: 4, performance: 88, engagement: 90, satisfaction: 88, label: "Day 4" },
                { x: 5, performance: 95, engagement: 87, satisfaction: 92, label: "Day 5" },
                { x: 6, performance: 89, engagement: 93, satisfaction: 86, label: "Day 6" },
                { x: 7, performance: 97, engagement: 89, satisfaction: 94, label: "Day 7" }
            ],
            weeks: [
                { x: 1, performance: 75, engagement: 80, label: "Week 1" },
                { x: 2, performance: 82, engagement: 85, label: "Week 2" },
                { x: 3, performance: 88, engagement: 87, label: "Week 3" },
                { x: 4, performance: 92, engagement: 90, label: "Week 4" }
            ],
            months: [
                { x: 1, performance: 70, engagement: 75, satisfaction: 72, label: "Jan" },
                { x: 2, performance: 78, engagement: 82, satisfaction: 79, label: "Feb" },
                { x: 3, performance: 85, engagement: 88, satisfaction: 86, label: "Mar" },
                { x: 4, performance: 92, engagement: 90, satisfaction: 89, label: "Apr" },
                { x: 5, performance: 88, engagement: 93, satisfaction: 91, label: "May" },
                { x: 6, performance: 95, engagement: 87, satisfaction: 93, label: "Jun" }
            ]
        },
        dataset2: {
            days: [
                { x: 1, performance: 68, engagement: 72, satisfaction: 75, label: "Day 1" },
                { x: 2, performance: 75, engagement: 78, satisfaction: 72, label: "Day 2" },
                { x: 3, performance: 82, engagement: 85, satisfaction: 80, label: "Day 3" },
                { x: 4, performance: 78, engagement: 82, satisfaction: 85, label: "Day 4" },
                { x: 5, performance: 85, engagement: 88, satisfaction: 87, label: "Day 5" },
                { x: 6, performance: 89, engagement: 85, satisfaction: 90, label: "Day 6" },
                { x: 7, performance: 92, engagement: 90, satisfaction: 88, label: "Day 7" }
            ],
            weeks: [
                { x: 1, performance: 65, engagement: 70, label: "Week 1" },
                { x: 2, performance: 72, engagement: 75, label: "Week 2" },
                { x: 3, performance: 78, engagement: 82, label: "Week 3" },
                { x: 4, performance: 85, engagement: 88, label: "Week 4" }
            ],
            months: [
                { x: 1, performance: 60, engagement: 65, satisfaction: 68, label: "Jan" },
                { x: 2, performance: 68, engagement: 72, satisfaction: 70, label: "Feb" },
                { x: 3, performance: 75, engagement: 78, satisfaction: 77, label: "Mar" },
                { x: 4, performance: 82, engagement: 85, satisfaction: 80, label: "Apr" },
                { x: 5, performance: 78, engagement: 88, satisfaction: 85, label: "May" },
                { x: 6, performance: 85, engagement: 82, satisfaction: 88, label: "Jun" }
            ]
        }
    };

    const getRechartsCurrentLines = (): RechartsLineData[] => {
        return rechartsDatasets[rechartsDataset as keyof typeof rechartsDatasets][rechartsTimePeriod];
    };

    const getRechartsCurrentData = (): RechartsDataPoint[] => {
        return rechartsData[rechartsDataset as keyof typeof rechartsData][rechartsTimePeriod];
    };

    const getRechartsAxisLabel = (period: TimePeriod): string => {
        const labels = {
            days: 'Days',
            weeks: 'Weeks', 
            months: 'Months'
        };
        return labels[period];
    };

    const getRechartsTickFormat = (period: TimePeriod) => {
        const formats = {
            days: (d: number | string) => `Day ${d}`,
            weeks: (d: number | string) => `Week ${d}`,
            months: (d: number | string) => {
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                return months[Number(d) - 1] || `Month ${d}`;
            }
        };
        return formats[period];
    };

    // Visx-specific data and functions
    const visxDatasets = {
        dataset1: {
            days: [
                {
                    id: 'performance',
                    name: 'Performance',
                    color: '#F9CA00',
                    strokeWidth: 3,
                    showDots: true,
                    dotRadius: 5,
                    data: [
                        { x: 1, y: 88, label: "Day 1" },
                        { x: 2, y: 92, label: "Day 2" },
                        { x: 3, y: 85, label: "Day 3" },
                        { x: 4, y: 96, label: "Day 4" },
                        { x: 5, y: 91, label: "Day 5" },
                        { x: 6, y: 94, label: "Day 6" },
                        { x: 7, y: 98, label: "Day 7" }
                    ]
                },
                {
                    id: 'engagement',
                    name: 'Engagement',
                    color: '#e74c3c',
                    strokeWidth: 2,
                    showDots: true,
                    dotRadius: 4,
                    data: [
                        { x: 1, y: 82, label: "Day 1" },
                        { x: 2, y: 87, label: "Day 2" },
                        { x: 3, y: 83, label: "Day 3" },
                        { x: 4, y: 91, label: "Day 4" },
                        { x: 5, y: 89, label: "Day 5" },
                        { x: 6, y: 93, label: "Day 6" },
                        { x: 7, y: 90, label: "Day 7" }
                    ]
                },
                {
                    id: 'satisfaction',
                    name: 'Satisfaction',
                    color: '#3498db',
                    strokeWidth: 2,
                    strokeDasharray: '5,5',
                    showDots: true,
                    dotRadius: 3,
                    data: [
                        { x: 1, y: 79, label: "Day 1" },
                        { x: 2, y: 84, label: "Day 2" },
                        { x: 3, y: 81, label: "Day 3" },
                        { x: 4, y: 88, label: "Day 4" },
                        { x: 5, y: 86, label: "Day 5" },
                        { x: 6, y: 90, label: "Day 6" },
                        { x: 7, y: 87, label: "Day 7" }
                    ]
                }
            ],
            weeks: [
                {
                    id: 'performance',
                    name: 'Performance',
                    color: '#F9CA00',
                    strokeWidth: 3,
                    data: [
                        { x: 1, y: 72, label: "Week 1" },
                        { x: 2, y: 78, label: "Week 2" },
                        { x: 3, y: 85, label: "Week 3" },
                        { x: 4, y: 89, label: "Week 4" }
                    ]
                },
                {
                    id: 'engagement',
                    name: 'Engagement',
                    color: '#e74c3c',
                    strokeWidth: 2,
                    data: [
                        { x: 1, y: 68, label: "Week 1" },
                        { x: 2, y: 75, label: "Week 2" },
                        { x: 3, y: 82, label: "Week 3" },
                        { x: 4, y: 87, label: "Week 4" }
                    ]
                },
                {
                    id: 'efficiency',
                    name: 'Efficiency',
                    color: '#9b59b6',
                    strokeWidth: 2,
                    strokeDasharray: '3,3',
                    data: [
                        { x: 1, y: 65, label: "Week 1" },
                        { x: 2, y: 72, label: "Week 2" },
                        { x: 3, y: 79, label: "Week 3" },
                        { x: 4, y: 84, label: "Week 4" }
                    ]
                }
            ],
            months: [
                {
                    id: 'performance',
                    name: 'Performance',
                    color: '#F9CA00',
                    strokeWidth: 4,
                    data: [
                        { x: 1, y: 65, label: "Jan" },
                        { x: 2, y: 72, label: "Feb" },
                        { x: 3, y: 78, label: "Mar" },
                        { x: 4, y: 85, label: "Apr" },
                        { x: 5, y: 89, label: "May" },
                        { x: 6, y: 93, label: "Jun" }
                    ]
                },
                {
                    id: 'engagement',
                    name: 'Engagement',
                    color: '#e74c3c',
                    strokeWidth: 3,
                    data: [
                        { x: 1, y: 62, label: "Jan" },
                        { x: 2, y: 68, label: "Feb" },
                        { x: 3, y: 75, label: "Mar" },
                        { x: 4, y: 82, label: "Apr" },
                        { x: 5, y: 86, label: "May" },
                        { x: 6, y: 90, label: "Jun" }
                    ]
                },
                {
                    id: 'satisfaction',
                    name: 'Satisfaction',
                    color: '#3498db',
                    strokeWidth: 2,
                    strokeDasharray: '5,5',
                    data: [
                        { x: 1, y: 58, label: "Jan" },
                        { x: 2, y: 65, label: "Feb" },
                        { x: 3, y: 72, label: "Mar" },
                        { x: 4, y: 78, label: "Apr" },
                        { x: 5, y: 83, label: "May" },
                        { x: 6, y: 87, label: "Jun" }
                    ]
                },
                {
                    id: 'quality',
                    name: 'Quality',
                    color: '#2ecc71',
                    strokeWidth: 2,
                    data: [
                        { x: 1, y: 70, label: "Jan" },
                        { x: 2, y: 74, label: "Feb" },
                        { x: 3, y: 79, label: "Mar" },
                        { x: 4, y: 84, label: "Apr" },
                        { x: 5, y: 88, label: "May" },
                        { x: 6, y: 92, label: "Jun" }
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
                    strokeWidth: 3,
                    data: [
                        { x: 1, y: 75, label: "Day 1" },
                        { x: 2, y: 82, label: "Day 2" },
                        { x: 3, y: 78, label: "Day 3" },
                        { x: 4, y: 86, label: "Day 4" },
                        { x: 5, y: 91, label: "Day 5" },
                        { x: 6, y: 87, label: "Day 6" },
                        { x: 7, y: 93, label: "Day 7" }
                    ]
                },
                {
                    id: 'engagement',
                    name: 'Engagement',
                    color: '#9b59b6',
                    strokeWidth: 2,
                    data: [
                        { x: 1, y: 68, label: "Day 1" },
                        { x: 2, y: 74, label: "Day 2" },
                        { x: 3, y: 71, label: "Day 3" },
                        { x: 4, y: 79, label: "Day 4" },
                        { x: 5, y: 83, label: "Day 5" },
                        { x: 6, y: 80, label: "Day 6" },
                        { x: 7, y: 86, label: "Day 7" }
                    ]
                },
                {
                    id: 'satisfaction',
                    name: 'Satisfaction',
                    color: '#f39c12',
                    strokeWidth: 2,
                    strokeDasharray: '3,3',
                    data: [
                        { x: 1, y: 72, label: "Day 1" },
                        { x: 2, y: 77, label: "Day 2" },
                        { x: 3, y: 74, label: "Day 3" },
                        { x: 4, y: 81, label: "Day 4" },
                        { x: 5, y: 85, label: "Day 5" },
                        { x: 6, y: 83, label: "Day 6" },
                        { x: 7, y: 88, label: "Day 7" }
                    ]
                }
            ],
            weeks: [
                {
                    id: 'performance',
                    name: 'Performance',
                    color: '#2ecc71',
                    strokeWidth: 3,
                    data: [
                        { x: 1, y: 68, label: "Week 1" },
                        { x: 2, y: 75, label: "Week 2" },
                        { x: 3, y: 82, label: "Week 3" },
                        { x: 4, y: 88, label: "Week 4" }
                    ]
                },
                {
                    id: 'engagement',
                    name: 'Engagement',
                    color: '#9b59b6',
                    strokeWidth: 2,
                    data: [
                        { x: 1, y: 62, label: "Week 1" },
                        { x: 2, y: 69, label: "Week 2" },
                        { x: 3, y: 76, label: "Week 3" },
                        { x: 4, y: 83, label: "Week 4" }
                    ]
                },
                {
                    id: 'efficiency',
                    name: 'Efficiency',
                    color: '#e67e22',
                    strokeWidth: 2,
                    strokeDasharray: '4,4',
                    data: [
                        { x: 1, y: 59, label: "Week 1" },
                        { x: 2, y: 66, label: "Week 2" },
                        { x: 3, y: 73, label: "Week 3" },
                        { x: 4, y: 80, label: "Week 4" }
                    ]
                }
            ],
            months: [
                {
                    id: 'performance',
                    name: 'Performance',
                    color: '#2ecc71',
                    strokeWidth: 4,
                    data: [
                        { x: 1, y: 58, label: "Jan" },
                        { x: 2, y: 65, label: "Feb" },
                        { x: 3, y: 72, label: "Mar" },
                        { x: 4, y: 79, label: "Apr" },
                        { x: 5, y: 85, label: "May" },
                        { x: 6, y: 91, label: "Jun" }
                    ]
                },
                {
                    id: 'engagement',
                    name: 'Engagement',
                    color: '#9b59b6',
                    strokeWidth: 3,
                    data: [
                        { x: 1, y: 55, label: "Jan" },
                        { x: 2, y: 62, label: "Feb" },
                        { x: 3, y: 68, label: "Mar" },
                        { x: 4, y: 75, label: "Apr" },
                        { x: 5, y: 81, label: "May" },
                        { x: 6, y: 87, label: "Jun" }
                    ]
                },
                {
                    id: 'satisfaction',
                    name: 'Satisfaction',
                    color: '#f39c12',
                    strokeWidth: 2,
                    strokeDasharray: '5,5',
                    data: [
                        { x: 1, y: 52, label: "Jan" },
                        { x: 2, y: 59, label: "Feb" },
                        { x: 3, y: 65, label: "Mar" },
                        { x: 4, y: 72, label: "Apr" },
                        { x: 5, y: 78, label: "May" },
                        { x: 6, y: 84, label: "Jun" }
                    ]
                },
                {
                    id: 'quality',
                    name: 'Quality',
                    color: '#34495e',
                    strokeWidth: 2,
                    data: [
                        { x: 1, y: 63, label: "Jan" },
                        { x: 2, y: 68, label: "Feb" },
                        { x: 3, y: 74, label: "Mar" },
                        { x: 4, y: 80, label: "Apr" },
                        { x: 5, y: 85, label: "May" },
                        { x: 6, y: 89, label: "Jun" }
                    ]
                }
            ]
        }
    };

    const getVisxCurrentLines = (): VisxLineData[] => {
        const allLines = visxDatasets[visxDataset as keyof typeof visxDatasets][visxTimePeriod];
        return allLines.filter(line => visxLineVisibility[line.id]);
    };

    const getVisxAxisLabel = (period: TimePeriod): string => {
        const labels = {
            days: 'Days',
            weeks: 'Weeks',
            months: 'Months'
        };
        return labels[period];
    };

    const getVisxTickFormat = (period: TimePeriod) => {
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

    // Filter functions for visible lines
    const getFilteredD3Data = (): LineData[] => {
        return getCurrentData().filter(line => d3LineVisibility[line.id]);
    };

    const getFilteredRechartsLines = (): RechartsLineData[] => {
        return getRechartsCurrentLines().filter(line => rechartsLineVisibility[line.id]);
    };

    const getFilteredRechartsData = (): RechartsDataPoint[] => {
        const data = getRechartsCurrentData();
        const visibleKeys = getRechartsCurrentLines()
            .filter(line => rechartsLineVisibility[line.id])
            .map(line => line.dataKey);
        
        return data.map(point => {
            const filteredPoint: RechartsDataPoint = { x: point.x, label: point.label };
            visibleKeys.forEach(key => {
                if (point[key as keyof RechartsDataPoint] !== undefined) {
                    (filteredPoint as any)[key] = (point as any)[key];
                }
            });
            return filteredPoint;
        });
    };

    // Toggle functions for line visibility
    const toggleD3LineVisibility = (lineId: string) => {
        setD3LineVisibility((prev: LineVisibility) => ({ ...prev, [lineId]: !prev[lineId] }));
    };

    const toggleRechartsLineVisibility = (lineId: string) => {
        setRechartsLineVisibility((prev: LineVisibility) => ({ ...prev, [lineId]: !prev[lineId] }));
    };

    const toggleVisxLineVisibility = (lineId: string) => {
        setVisxLineVisibility((prev: LineVisibility) => ({ ...prev, [lineId]: !prev[lineId] }));
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

                {/* D3.js Line Visibility Controls */}
                <div className="mb-4">
                    <h4 className="text-md font-semibold mb-2">D3.js Visible Lines:</h4>
                    <div className="flex gap-4 flex-wrap">
                        {getCurrentData().map((line) => (
                            <label key={line.id} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={d3LineVisibility[line.id] || false}
                                    onChange={() => toggleD3LineVisibility(line.id)}
                                    className="w-4 h-4"
                                />
                                <div 
                                    className="w-4 h-0.5" 
                                    style={{ backgroundColor: line.color }}
                                ></div>
                                <span className="text-sm font-medium">{line.name}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* D3.js Linear Graph */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-center">D3.js Linear Graph</h2>
                    <LinearGraph
                        lines={getFilteredD3Data()}
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

                {/* Separator */}
                <div className="border-t border-gray-300 my-12"></div>

                {/* Recharts Section */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-center">Recharts Linear Graph</h2>
                    
                    {/* Recharts Time Period Selection */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3">Recharts Time Period:</h3>
                        <div className="flex gap-3">
                            {(['days', 'weeks', 'months'] as TimePeriod[]).map((period) => (
                                <button
                                    key={`recharts-${period}`}
                                    onClick={() => setRechartsTimePeriod(period)}
                                    className={`px-4 py-2 rounded font-medium transition-colors ${
                                        rechartsTimePeriod === period
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    {period.charAt(0).toUpperCase() + period.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Recharts Dataset Selection */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3">Recharts Dataset:</h3>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setRechartsDataset('dataset1')}
                                className={`px-4 py-2 rounded font-medium transition-colors ${
                                    rechartsDataset === 'dataset1'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                Dataset 1
                            </button>
                            <button
                                onClick={() => setRechartsDataset('dataset2')}
                                className={`px-4 py-2 rounded font-medium transition-colors ${
                                    rechartsDataset === 'dataset2'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                Dataset 2
                            </button>
                        </div>
                    </div>

                    {/* Recharts Line Visibility Controls */}
                    <div className="mb-4">
                        <h4 className="text-md font-semibold mb-2">Recharts Visible Lines:</h4>
                        <div className="flex gap-4 flex-wrap">
                            {getRechartsCurrentLines().map((line) => (
                                <label key={line.id} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={rechartsLineVisibility[line.id] || false}
                                        onChange={() => toggleRechartsLineVisibility(line.id)}
                                        className="w-4 h-4"
                                    />
                                    <div 
                                        className="w-4 h-0.5" 
                                        style={{ backgroundColor: line.color }}
                                    ></div>
                                    <span className="text-sm font-medium">{line.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Recharts Graph */}
                    <RechartsLineGraph
                        lines={getFilteredRechartsLines()}
                        data={getFilteredRechartsData()}
                        height={400}
                        xAxisLabel={getRechartsAxisLabel(rechartsTimePeriod)}
                        yAxisLabel="Score"
                        xTickFormatter={getRechartsTickFormat(rechartsTimePeriod)}
                        yTickFormatter={(value: number | string) => `${value}`}
                        showGrid={true}
                        showTooltip={true}
                        showLegend={true}
                        responsive={true}
                        animationDuration={800}
                    />
                </div>

                {/* Separator */}
                <div className="border-t border-gray-300 my-12"></div>

                {/* Visx Section */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-center">Visx Linear Graph</h2>
                    
                    {/* Visx Time Period Selection */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3">Visx Time Period:</h3>
                        <div className="flex gap-3">
                            {(['days', 'weeks', 'months'] as TimePeriod[]).map((period) => (
                                <button
                                    key={`visx-${period}`}
                                    onClick={() => setVisxTimePeriod(period)}
                                    className={`px-4 py-2 rounded font-medium transition-colors ${
                                        visxTimePeriod === period
                                            ? 'bg-green-500 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    {period.charAt(0).toUpperCase() + period.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Visx Dataset Selection */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3">Visx Dataset:</h3>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setVisxDataset('dataset1')}
                                className={`px-4 py-2 rounded font-medium transition-colors ${
                                    visxDataset === 'dataset1'
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                Dataset 1
                            </button>
                            <button
                                onClick={() => setVisxDataset('dataset2')}
                                className={`px-4 py-2 rounded font-medium transition-colors ${
                                    visxDataset === 'dataset2'
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                Dataset 2
                            </button>
                        </div>
                    </div>

                    {/* Visx Line Visibility Controls */}
                    <div className="mb-4">
                        <h4 className="text-md font-semibold mb-2">Visx Visible Lines:</h4>
                        <div className="flex gap-4 flex-wrap">
                            {visxDatasets[visxDataset as keyof typeof visxDatasets][visxTimePeriod].map((line) => (
                                <label key={line.id} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={visxLineVisibility[line.id] || false}
                                        onChange={() => toggleVisxLineVisibility(line.id)}
                                        className="w-4 h-4"
                                    />
                                    <div 
                                        className="w-4 h-0.5" 
                                        style={{ backgroundColor: line.color }}
                                    ></div>
                                    <span className="text-sm font-medium">{line.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Visx Graph */}
                    <VisxLineGraph
                        lines={getVisxCurrentLines()}
                        height={400}
                        xAxisLabel={getVisxAxisLabel(visxTimePeriod)}
                        yAxisLabel="Score"
                        xTickFormatter={getVisxTickFormat(visxTimePeriod)}
                        yTickFormatter={(value: d3.NumberValue) => `${value}`}
                        showGrid={true}
                        showTooltip={true}
                        responsive={true}
                        curveType="linear"
                        backgroundColor="#fafafa"
                    />
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Me;