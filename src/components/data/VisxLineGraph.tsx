/**
 * VisxLineGraph Component - A Visx-powered React component for rendering linear graphs
 * 
 * OVERVIEW:
 * This component creates interactive linear graphs using Visx (formerly VX) library for data visualization.
 * Visx is a collection of reusable low-level visualization components that combines the power of D3
 * with the benefits of React, providing a more React-friendly approach than raw D3.
 * 
 * VISX COMPONENTS USED:
 * - Group: Container for grouping SVG elements with transformations
 * - LinePath: Creates smooth line paths between data points
 * - scaleLinear: D3 scale functions for mapping data to pixel coordinates
 * - AxisBottom/AxisLeft: Axis components for labeling and ticks
 * - GridRows/GridColumns: Grid line components for better data reading
 * - Circle: Individual data points on the lines
 * - ParentSize: Responsive container for automatic sizing
 * - Tooltip: Interactive hover tooltips
 * 
 * SETUP INSTRUCTIONS:
 * 1. Install Visx packages: npm install @visx/scale @visx/curve @visx/group @visx/shape @visx/axis @visx/grid @visx/tooltip @visx/responsive
 * 2. Import component: import VisxLineGraph from './components/data/VisxLineGraph'
 * 3. Prepare your data in the required format
 * 
 * USAGE EXAMPLE:
 * const sampleLines = [
 *   {
 *     id: 'performance',
 *     name: 'Performance',
 *     color: '#F9CA00',
 *     strokeWidth: 3,
 *     data: [
 *       { x: 1, y: 85, label: "Q1" },
 *       { x: 2, y: 92, label: "Q2" },
 *       { x: 3, y: 78, label: "Q3" },
 *       { x: 4, y: 95, label: "Q4" }
 *     ]
 *   }
 * ];
 * 
 * <VisxLineGraph 
 *   lines={sampleLines}
 *   width={800}
 *   height={400}
 *   xAxisLabel="Quarters"
 *   yAxisLabel="Score"
 *   showGrid={true}
 *   showTooltip={true}
 * />
 */

import React, { useMemo, useCallback } from 'react';
import { Group } from '@visx/group';
import { LinePath } from '@visx/shape';
import { scaleLinear } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';
import { Circle } from '@visx/shape';
import { ParentSize } from '@visx/responsive';
import { useTooltip, Tooltip, defaultStyles } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { bisector } from 'd3-array';
import * as d3 from 'd3';

/**
 * Data point structure for Visx line graph
 */
interface VisxDataPoint {
  x: number;                    // X-axis value
  y: number;                    // Y-axis value
  label?: string;              // Optional label for the point
}

/**
 * Line configuration for each data series
 */
interface VisxLineData {
  id: string;                  // Unique identifier
  name: string;                // Display name for legend
  color?: string;              // Line color (default: '#333')
  strokeWidth?: number;        // Line thickness (default: 2)
  strokeDasharray?: string;    // Dash pattern (e.g., "5,5" for dashed line)
  showDots?: boolean;          // Show dots on data points (default: true)
  dotRadius?: number;          // Dot radius (default: 4)
  data: VisxDataPoint[];       // Data points for this line
}

/**
 * Configuration props for the VisxLineGraph component
 */
interface VisxLineGraphProps {
  lines: VisxLineData[];                                           // Array of line configurations
  width?: number;                                                  // Chart width (default: responsive)
  height?: number;                                                 // Chart height (default: 400)
  margin?: { top: number; right: number; bottom: number; left: number }; // Chart margins
  xAxisLabel?: string;                                            // X-axis label
  yAxisLabel?: string;                                            // Y-axis label
  xDomain?: [number, number];                                     // X-axis domain
  yDomain?: [number, number];                                     // Y-axis domain
  showGrid?: boolean;                                             // Show grid lines (default: true)
  showTooltip?: boolean;                                          // Show hover tooltips (default: true)
  gridStroke?: string;                                            // Grid line color
  gridOpacity?: number;                                           // Grid line opacity (0-1)
  xTickFormatter?: (value: d3.NumberValue) => string;           // Custom X-axis tick formatter
  yTickFormatter?: (value: d3.NumberValue) => string;           // Custom Y-axis tick formatter
  backgroundColor?: string;                                        // Chart background color
  responsive?: boolean;                                           // Make chart responsive (default: true)
  curveType?: 'linear' | 'cardinal' | 'monotone';               // Line curve type
  darkTheme?: boolean;                                            // Enable dark theme styling (default: false)
}

// Tooltip styles
const tooltipStyles = {
  ...defaultStyles,
  minWidth: 60,
  backgroundColor: 'rgba(0,0,0,0.9)',
  color: 'white',
  fontSize: '12px',
  padding: '8px',
  borderRadius: '4px',
};

const VisxLineGraph: React.FC<VisxLineGraphProps> = ({
  lines,
  width: fixedWidth,
  height = 400,
  margin = { top: 20, right: 30, bottom: 50, left: 50 },
  xAxisLabel,
  yAxisLabel,
  xDomain,
  yDomain,
  showGrid = true,
  showTooltip = true,
  gridStroke,
  gridOpacity = 0.6,
  xTickFormatter,
  yTickFormatter,
  backgroundColor,
  responsive = true,
  curveType = 'linear',
  darkTheme = false
}) => {
  // Tooltip setup
  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip: displayTooltip,
    hideTooltip,
  } = useTooltip<VisxDataPoint>();

  // Define theme colors
  const themeColors = {
    background: backgroundColor || (darkTheme ? '#1a1a1a' : 'transparent'),
    text: darkTheme ? '#e5e5e5' : '#333333',
    grid: gridStroke || (darkTheme ? '#404040' : '#e1e5e9'),
    axis: darkTheme ? '#666666' : '#333333'
  };

  // Chart content component
  const ChartContent: React.FC<{ width: number; height: number }> = ({ width, height }) => {
    // Calculate inner dimensions with safety checks to prevent negative values
    const innerWidth = Math.max(0, width - margin.left - margin.right);
    const innerHeight = Math.max(0, height - margin.top - margin.bottom);

    // Get all data points for domain calculation
    const allDataPoints = useMemo(() => {
      return lines.flatMap(line => line.data);
    }, [lines]);

    // Create scales
    const xScale = useMemo(() => {
      if (allDataPoints.length === 0) {
        return scaleLinear<number>({ range: [0, innerWidth], domain: [0, 1] });
      }
      const domain = xDomain || [
        Math.min(...allDataPoints.map(d => d.x)),
        Math.max(...allDataPoints.map(d => d.x))
      ];
      return scaleLinear<number>({
        range: [0, innerWidth],
        domain
      });
    }, [allDataPoints, innerWidth, xDomain]);

    const yScale = useMemo(() => {
      if (allDataPoints.length === 0) {
        return scaleLinear<number>({ range: [innerHeight, 0], domain: [0, 1] });
      }
      const domain = yDomain || [
        Math.min(...allDataPoints.map(d => d.y)),
        Math.max(...allDataPoints.map(d => d.y))
      ];
      return scaleLinear<number>({
        range: [innerHeight, 0],
        domain
      });
    }, [allDataPoints, innerHeight, yDomain]);

    // Accessors
    const getX = (d: VisxDataPoint) => xScale(d.x) ?? 0;
    const getY = (d: VisxDataPoint) => yScale(d.y) ?? 0;

    // Bisector for finding closest data point
    const bisectX = useMemo(() => bisector<VisxDataPoint, number>(d => d.x).left, []);

    // Mouse handlers for tooltip
    const handleTooltip = useCallback(
      (event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => {
        if (!showTooltip || lines.length === 0) return;

        const { x } = localPoint(event) || { x: 0, y: 0 };
        const x0 = xScale.invert(x - margin.left);
        
        // Find closest data point from all lines
        let closestPoint: VisxDataPoint | null = null;
        let closestDistance = Infinity;
        
        lines.forEach(line => {
          const index = bisectX(line.data, x0, 1);
          const d0 = line.data[index - 1];
          const d1 = line.data[index];
          
          if (d0 && d1) {
            const d = x0 - d0.x > d1.x - x0 ? d1 : d0;
            const distance = Math.abs(getX(d) + margin.left - x);
            if (distance < closestDistance) {
              closestDistance = distance;
              closestPoint = d;
            }
          } else if (d0) {
            const distance = Math.abs(getX(d0) + margin.left - x);
            if (distance < closestDistance) {
              closestDistance = distance;
              closestPoint = d0;
            }
          }
        });

        if (closestPoint) {
          displayTooltip({
            tooltipData: closestPoint,
            tooltipLeft: getX(closestPoint),
            tooltipTop: getY(closestPoint),
          });
        }
      },
      [showTooltip, lines, xScale, yScale, margin.left, bisectX, getX, getY, displayTooltip]
    );

    // Check for invalid dimensions after all hooks are defined
    if (innerWidth <= 0 || innerHeight <= 0) {
      console.warn('VisxLineGraph: Invalid dimensions', { width, height, innerWidth, innerHeight, margin });
      return (
        <div className="visx-line-graph-container" style={{ width, height, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
          <span style={{ padding: '10px', textAlign: 'center', fontSize: '14px', color: '#666' }}>
            Chart container too small<br />
            (Available: {innerWidth}×{innerHeight})
          </span>
        </div>
      );
    }

    return (
      <div style={{ position: 'relative' }}>
        <svg width={width} height={height} style={{ backgroundColor: themeColors.background }}>
          <rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill="transparent"
            rx={14}
          />
          
          <Group left={margin.left} top={margin.top}>
            {/* Grid */}
            {showGrid && (
              <Group>
                <GridRows
                  scale={yScale}
                  width={innerWidth}
                  strokeDasharray="2,2"
                  stroke={themeColors.grid}
                  strokeOpacity={gridOpacity}
                  pointerEvents="none"
                />
                <GridColumns
                  scale={xScale}
                  height={innerHeight}
                  strokeDasharray="2,2"
                  stroke={themeColors.grid}
                  strokeOpacity={gridOpacity}
                  pointerEvents="none"
                />
              </Group>
            )}

            {/* Lines */}
            {lines.map((line) => (
              <Group key={line.id}>
                <LinePath
                  data={line.data}
                  x={getX}
                  y={getY}
                  stroke={line.color || '#333'}
                  strokeWidth={line.strokeWidth || 2}
                  strokeDasharray={line.strokeDasharray}
                  fill="none"
                  curve={curveType === 'linear' ? d3.curveLinear : curveType === 'cardinal' ? d3.curveCardinal : d3.curveMonotoneX}
                />
                
                {/* Data points */}
                {(line.showDots !== false) && line.data.map((point, i) => (
                  <Circle
                    key={`${line.id}-${i}`}
                    cx={getX(point)}
                    cy={getY(point)}
                    r={line.dotRadius || 4}
                    fill={line.color || '#333'}
                    stroke="white"
                    strokeWidth={2}
                  />
                ))}
              </Group>
            ))}

            {/* Axes */}
            <AxisBottom
              scale={xScale}
              top={innerHeight}
              tickFormat={xTickFormatter}
              stroke={themeColors.axis}
              tickStroke={themeColors.axis}
              tickLabelProps={{fill: themeColors.text}}
              label={xAxisLabel}
              labelProps={{
                x: innerWidth / 2,
                y: -10,
                fontSize: 12,
                textAnchor: 'middle',
                fill: themeColors.text
              }}
            />
            
            <AxisLeft
              scale={yScale}
              tickFormat={yTickFormatter}
              stroke={themeColors.axis}
              tickStroke={themeColors.axis}
              tickLabelProps={{fill: themeColors.text}}
              label={yAxisLabel}
              labelProps={{
                x: -40,
                y: innerHeight / 2,
                fontSize: 12,
                textAnchor: 'middle',
                fill: themeColors.text,
                angle: -90
              }}
            />

            {/* Tooltip area */}
            {showTooltip && (
              <rect
                x={0}
                y={0}
                width={innerWidth}
                height={innerHeight}
                fill="transparent"
                onTouchStart={handleTooltip}
                onTouchMove={handleTooltip}
                onMouseMove={handleTooltip}
                onMouseLeave={() => hideTooltip()}
              />
            )}
          </Group>
        </svg>

        {/* Tooltip */}
        {tooltipOpen && tooltipData && (
          <Tooltip
            top={tooltipTop! + margin.top}
            left={tooltipLeft! + margin.left}
            style={{
              ...tooltipStyles,
              backgroundColor: darkTheme ? '#2a2a2a' : tooltipStyles.backgroundColor,
              color: themeColors.text,
              border: `1px solid ${darkTheme ? '#555555' : '#cccccc'}`
            }}
          >
            <div>
              <strong>
                {xAxisLabel || 'X'}: {xTickFormatter ? xTickFormatter(tooltipData.x) : tooltipData.x}
              </strong>
            </div>
            <div>
              {yAxisLabel || 'Y'}: {yTickFormatter ? yTickFormatter(tooltipData.y) : tooltipData.y}
            </div>
            {tooltipData.label && (
              <div>
                <em>{tooltipData.label}</em>
              </div>
            )}
          </Tooltip>
        )}
      </div>
    );
  };

  if (responsive && !fixedWidth) {
    return (
      <div 
        className={`visx-line-graph-container ${darkTheme ? 'dark-theme' : ''}`}
        style={{ 
          width: '100%', 
          height,
          backgroundColor: themeColors.background,
          borderRadius: '8px',
          padding: darkTheme ? '8px' : '0'
        }}
      >
        <ParentSize>
          {({ width }) => <ChartContent width={width} height={height} />}
        </ParentSize>
      </div>
    );
  }

  return (
    <div 
      className={`visx-line-graph-container ${darkTheme ? 'dark-theme' : ''}`}
      style={{
        backgroundColor: themeColors.background,
        borderRadius: '8px',
        padding: darkTheme ? '8px' : '0'
      }}
    >
      <ChartContent width={fixedWidth || 600} height={height} />
    </div>
  );
};

export default VisxLineGraph;