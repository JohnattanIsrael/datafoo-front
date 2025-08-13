/**
 * LinearGraph Component - A D3.js-powered React component for rendering linear graphs
 * 
 * OVERVIEW:
 * This component creates interactive linear graphs using D3.js for data visualization.
 * It supports customizable styling, icons, animations, and responsive design.
 * 
 * D3.js METHODS USED:
 * - d3.select(): Selects DOM elements (SVG container)
 * - d3.scaleLinear(): Creates linear scales for mapping data values to pixel coordinates
 * - d3.extent(): Finds min/max values in data arrays for domain calculation
 * - d3.line(): Creates SVG path generator for connecting data points
 * - d3.curveLinear: Line interpolation method for straight line connections
 * - d3.axisBottom()/d3.axisLeft(): Generate X and Y axis with ticks and labels
 * 
 * SETUP INSTRUCTIONS:
 * 1. Install D3.js: npm install d3 @types/d3
 * 2. Import component: import LinearGraph from './components/data/LinearGraph'
 * 3. Prepare your data in DataPoint format
 * 4. Include CSS file for styling
 * 
 * USAGE EXAMPLE:
 * const sampleData = [
 *   { x: 1, y: 10, label: "Q1", icon: "quarter1" },
 *   { x: 2, y: 25, label: "Q2", icon: "quarter2" },
 *   { x: 3, y: 15, label: "Q3" },
 *   { x: 4, y: 30, label: "Q4", icon: "quarter4" }
 * ];
 * 
 * const customIcons = {
 *   quarter1: "/assets/q1-icon.svg",
 *   quarter2: "/assets/q2-icon.svg",
 *   quarter4: "/assets/q4-icon.svg"
 * };
 * 
 * <LinearGraph 
 *   data={sampleData}
 *   customIcons={customIcons}
 *   width={800}
 *   height={500}
 *   xAxisLabel="Quarters"
 *   yAxisLabel="Revenue (K)"
 *   lineColor="#F9CA00"
 *   pointColor="#183140"
 *   showGrid={true}
 *   xTickCount={4}
 *   yTickCount={5}
 *   xTickFormat={(d) => `Q${d}`}
 *   yTickFormat={(d) => `$${d}K`}
 * />
 */

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './LinearGraph.css';

/**
 * Data structure for each point on the graph
 */
interface DataPoint {
    x: number;          // X-axis value (horizontal position)
    y: number;          // Y-axis value (vertical position)  
    label?: string;     // Optional text label displayed above point
    icon?: string;      // Optional icon key for customIcons mapping
}

/**
 * Data structure for multiple lines on the graph
 */
interface LineData {
    id: string;         // Unique identifier for the line
    name: string;       // Display name for the line
    data: DataPoint[];  // Data points for this line
    color?: string;     // Color for this line (overrides default lineColor)
    pointColor?: string; // Color for points on this line (overrides default pointColor)
}

/**
 * Configuration props for the LinearGraph component
 */
interface LinearGraphProps {
    data?: DataPoint[];                                         // Single line data (deprecated, use lines instead)
    lines?: LineData[];                                         // Multiple lines data
    width?: number;                                            // Graph width in pixels (default: 600)
    height?: number;                                           // Graph height in pixels (default: 400)
    margin?: { top: number; right: number; bottom: number; left: number }; // Margins around the plot area
    lineColor?: string;                                        // Color of connecting lines (default: #F9CA00)
    pointColor?: string;                                       // Color of data points (default: #183140)
    pointRadius?: number;                                      // Radius of data points in pixels (default: 5)
    showGrid?: boolean;                                        // Whether to show grid lines (default: true)
    xAxisLabel?: string;                                       // Label for X-axis (default: "X Axis")
    yAxisLabel?: string;                                       // Label for Y-axis (default: "Y Axis")
    customIcons?: { [key: string]: string };                  // Icon mapping: { iconKey: iconPath }
    xTickCount?: number;                                       // Number of ticks on X-axis (default: auto)
    yTickCount?: number;                                       // Number of ticks on Y-axis (default: auto)
    xTickFormat?: (value: d3.NumberValue) => string;          // Custom formatter for X-axis tick labels
    yTickFormat?: (value: d3.NumberValue) => string;          // Custom formatter for Y-axis tick labels
    xDomain?: [number, number];                               // Custom X-axis domain [min, max] (default: auto from data)
    yDomain?: [number, number];                               // Custom Y-axis domain [min, max] (default: auto from data)
    gridOpacity?: number;                                     // Opacity of grid lines (0-1, default: 0.7)
    tickSize?: number;                                        // Length of axis tick marks (default: 6)
    darkTheme?: boolean;                                      // Enable dark theme styling (default: false)
    backgroundColor?: string;                                 // Background color override
}

const LinearGraph: React.FC<LinearGraphProps> = ({
    data,
    lines,
    width = 600,
    height = 400,
    margin = { top: 20, right: 30, bottom: 40, left: 50 },
    lineColor = '#F9CA00',
    pointColor = '#183140',
    pointRadius = 5,
    showGrid = true,
    xAxisLabel = 'X Axis',
    yAxisLabel = 'Y Axis',
    customIcons = {},
    xTickCount,
    yTickCount,
    xTickFormat,
    yTickFormat,
    xDomain,
    yDomain,
    gridOpacity = 0.7,
    tickSize = 6,
    darkTheme = false,
    backgroundColor
}) => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        // Determine which data to use - prioritize lines over data
        const linesToRender: LineData[] = lines || (data ? [{ id: 'default', name: 'Default', data, color: lineColor, pointColor }] : []);
        
        // Early return if no data provided
        if (linesToRender.length === 0 || linesToRender.every(line => line.data.length === 0)) return;

        // D3.js: Select the SVG element and clear any existing content
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); // Remove all child elements for clean re-render

        // Calculate the inner dimensions (excluding margins) with safety checks
        const innerWidth = Math.max(0, width - margin.left - margin.right);
        const innerHeight = Math.max(0, height - margin.top - margin.bottom);
        
        // Early return if dimensions are too small
        if (innerWidth <= 0 || innerHeight <= 0) return;

        // Flatten all data points for domain calculation
        const allDataPoints = linesToRender.flatMap(line => line.data);

        // D3.js: Create linear scales to map data values to pixel coordinates
        // xScale: Maps x-data values to horizontal pixel positions (0 to innerWidth)
        const xScale = d3.scaleLinear()
            .domain(xDomain || d3.extent(allDataPoints, d => d.x) as [number, number]) // Use custom domain or auto-calculate
            .range([0, innerWidth]);

        // yScale: Maps y-data values to vertical pixel positions (innerHeight to 0, inverted for SVG)
        const yScale = d3.scaleLinear()
            .domain(yDomain || d3.extent(allDataPoints, d => d.y) as [number, number]) // Use custom domain or auto-calculate
            .range([innerHeight, 0]); // Inverted because SVG y=0 is at top

        // Set background color based on theme
        const bgColor = backgroundColor || (darkTheme ? '#1a1a1a' : 'transparent');
        svg.style('background-color', bgColor);
        
        // Define theme colors
        const themeColors = {
            text: darkTheme ? '#e5e5e5' : '#333333',
            axis: darkTheme ? '#666666' : '#333333',
            grid: darkTheme ? '#404040' : '#e0e0e0'
        };

        // Create main group element with margin offset transform
        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // GRID GENERATION: Create background grid lines if enabled
        if (showGrid) {
            // Horizontal grid lines (for Y-axis reference)
            const xGridAxis = d3.axisBottom(xScale)
                .tickSize(-innerHeight) // Negative size creates lines extending upward
                .tickFormat(() => ''); // Empty format removes tick labels
            
            if (xTickCount) xGridAxis.ticks(xTickCount);

            g.append('g')
                .attr('class', 'grid')
                .attr('transform', `translate(0,${innerHeight})`)
                .call(xGridAxis)
                .style('opacity', gridOpacity)
                .selectAll('line')
                .style('stroke', themeColors.grid);

            // Vertical grid lines (for X-axis reference)
            const yGridAxis = d3.axisLeft(yScale)
                .tickSize(-innerWidth) // Negative size creates lines extending rightward
                .tickFormat(() => ''); // Empty format removes tick labels
            
            if (yTickCount) yGridAxis.ticks(yTickCount);

            g.append('g')
                .attr('class', 'grid')
                .call(yGridAxis)
                .style('opacity', gridOpacity)
                .selectAll('line')
                .style('stroke', themeColors.grid);
        }

        // LINE GENERATOR: D3.js line generator function to create SVG path data
        const line = d3.line<DataPoint>()
            .x(d => xScale(d.x))    // Map data x-value to pixel x-coordinate
            .y(d => yScale(d.y))    // Map data y-value to pixel y-coordinate
            .curve(d3.curveLinear); // Use straight lines between points (no interpolation)

        // DRAW MULTIPLE LINES: Create SVG path elements for each line
        linesToRender.forEach((lineData) => {
            const currentLineColor = lineData.color || lineColor;
            const currentPointColor = lineData.pointColor || pointColor;
            
            // Draw the line
            g.append('path')
                .datum(lineData.data)           // Bind line's dataset to path element
                .attr('class', `line line-${lineData.id}`)  // CSS class for styling
                .attr('d', line)                // 'd' attribute contains the SVG path data
                .style('stroke', currentLineColor) // Line color
                .style('stroke-width', 2)       // Line thickness
                .style('fill', 'none');         // No fill, just stroke

            // DATA POINTS: Create group elements for each data point in this line
            const points = g.selectAll(`.point-${lineData.id}`)
                .data(lineData.data)            // Bind data array for this line
                .enter().append('g')            // Create group for each data point
                .attr('class', `point point-${lineData.id}`) // CSS class for styling
                .attr('transform', d => `translate(${xScale(d.x)},${yScale(d.y)})`); // Position each point

            // RENDER POINTS: Add visual elements (circles or icons) and labels to each point
            points.each(function(d) {
                const point = d3.select(this); // Current point group element
                
                // Render custom icon if available, otherwise render circle
                if (d.icon && customIcons[d.icon]) {
                    point.append('image')
                        .attr('href', customIcons[d.icon])  // Icon image source
                        .attr('width', pointRadius * 2)     // Icon width
                        .attr('height', pointRadius * 2)    // Icon height
                        .attr('x', -pointRadius)            // Center horizontally
                        .attr('y', -pointRadius)            // Center vertically
                        .attr('class', 'point-icon');       // CSS class for styling
                } else {
                    // Default circle point
                    point.append('circle')
                        .attr('r', pointRadius)             // Circle radius
                        .attr('class', 'point-circle')      // CSS class for styling
                        .style('fill', currentPointColor);   // Circle fill color
                }

                // Add text label if provided
                if (d.label) {
                    point.append('text')
                        .attr('class', 'point-label')           // CSS class for styling
                        .attr('dy', -pointRadius - 5)           // Position above the point
                        .attr('text-anchor', 'middle')          // Center text horizontally
                        .text(d.label);                         // Label text content
                }
            });
        });

        // X-AXIS: Create bottom axis with customizable ticks and formatting
        const xAxis = d3.axisBottom(xScale)
            .tickSize(tickSize); // Length of tick marks
        
        if (xTickCount) xAxis.ticks(xTickCount);        // Set custom tick count
        if (xTickFormat) xAxis.tickFormat(xTickFormat); // Apply custom formatting

        g.append('g')
            .attr('class', 'x-axis')                        // CSS class for styling
            .attr('transform', `translate(0,${innerHeight})`) // Position at bottom
            .call(xAxis)                                    // Apply axis generator
            .selectAll('text')
            .style('fill', themeColors.text);
        
        g.select('.x-axis')
            .select('.domain')
            .style('stroke', themeColors.axis);
        
        g.select('.x-axis')
            .selectAll('.tick line')
            .style('stroke', themeColors.axis);

        // Y-AXIS: Create left axis with customizable ticks and formatting
        const yAxis = d3.axisLeft(yScale)
            .tickSize(tickSize); // Length of tick marks
        
        if (yTickCount) yAxis.ticks(yTickCount);        // Set custom tick count
        if (yTickFormat) yAxis.tickFormat(yTickFormat); // Apply custom formatting

        g.append('g')
            .attr('class', 'y-axis')    // CSS class for styling
            .call(yAxis)                // Apply axis generator
            .selectAll('text')
            .style('fill', themeColors.text);
        
        g.select('.y-axis')
            .select('.domain')
            .style('stroke', themeColors.axis);
        
        g.select('.y-axis')
            .selectAll('.tick line')
            .style('stroke', themeColors.axis);

        // X-AXIS LABEL: Add descriptive label below X-axis
        g.append('text')
            .attr('class', 'x-axis-label')  // CSS class for styling
            .attr('transform', `translate(${innerWidth / 2}, ${innerHeight + margin.bottom - 5})`) // Center bottom
            .style('text-anchor', 'middle') // Center text
            .style('fill', themeColors.text)
            .text(xAxisLabel);              // Label text

        // Y-AXIS LABEL: Add descriptive label to the left of Y-axis (rotated)
        g.append('text')
            .attr('class', 'y-axis-label')      // CSS class for styling
            .attr('transform', 'rotate(-90)')   // Rotate 90 degrees counterclockwise
            .attr('y', 0 - margin.left)        // Position left of axis
            .attr('x', 0 - (innerHeight / 2))  // Center vertically
            .attr('dy', '1em')                 // Fine-tune vertical position
            .style('text-anchor', 'middle')    // Center text
            .style('fill', themeColors.text)
            .text(yAxisLabel);                 // Label text

        // Dependencies array: Re-run effect when these props change
    }, [data, lines, width, height, margin, lineColor, pointColor, pointRadius, showGrid, xAxisLabel, yAxisLabel, customIcons, xTickCount, yTickCount, xTickFormat, yTickFormat, xDomain, yDomain, gridOpacity, tickSize, darkTheme, backgroundColor]);

    // Calculate background color outside of useEffect
    const bgColor = backgroundColor || (darkTheme ? '#1a1a1a' : 'transparent');

    /**
     * COMPONENT RENDER: Return the SVG container wrapped in a styled div
     * The SVG ref allows D3.js to manipulate the DOM directly
     */
    return (
        <div 
            className={`linear-graph-container ${darkTheme ? 'dark-theme' : ''}`}
            style={{
                backgroundColor: bgColor,
                borderRadius: '8px',
                padding: darkTheme ? '8px' : '0'
            }}
        >
            <svg
                ref={svgRef}                    // React ref for D3.js DOM manipulation
                width={width}                   // Total SVG width including margins
                height={height}                 // Total SVG height including margins
                className="linear-graph"        // CSS class for styling
            />
        </div>
    );
};

export default LinearGraph;