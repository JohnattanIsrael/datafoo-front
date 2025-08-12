/**
 * RechartsLineGraph Component - A Recharts-powered React component for rendering linear graphs
 * 
 * OVERVIEW:
 * This component creates interactive linear graphs using Recharts library for data visualization.
 * It supports multiple lines, customizable styling, responsive design, and extensive customization.
 * 
 * RECHARTS COMPONENTS USED:
 * - LineChart: Main container for the line chart
 * - Line: Individual line components for each data series
 * - XAxis/YAxis: Axis components with customizable formatting
 * - CartesianGrid: Grid lines for better data reading
 * - Tooltip: Interactive hover tooltips
 * - Legend: Legend component for multiple lines
 * - ResponsiveContainer: Makes chart responsive to container size
 * 
 * SETUP INSTRUCTIONS:
 * 1. Install Recharts: npm install recharts
 * 2. Import component: import RechartsLineGraph from './components/data/RechartsLineGraph'
 * 3. Prepare your data in the required format
 * 
 * USAGE EXAMPLE:
 * const sampleLines = [
 *   {
 *     id: 'performance',
 *     name: 'Performance',
 *     dataKey: 'performance',
 *     color: '#F9CA00',
 *     strokeWidth: 3,
 *     data: [
 *       { x: 1, performance: 85, label: "Q1" },
 *       { x: 2, performance: 92, label: "Q2" },
 *       { x: 3, performance: 78, label: "Q3" },
 *       { x: 4, performance: 95, label: "Q4" }
 *     ]
 *   }
 * ];
 * 
 * <RechartsLineGraph 
 *   lines={sampleLines}
 *   width={800}
 *   height={400}
 *   xAxisLabel="Quarters"
 *   yAxisLabel="Score"
 *   showGrid={true}
 *   showTooltip={true}
 *   showLegend={true}
 * />
 */

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

/**
 * Data point structure for Recharts - more flexible than D3 version
 */
interface RechartsDataPoint {
  x: number;                    // X-axis value
  label?: string;              // Optional label for the point
  [key: string]: number | string | undefined; // Dynamic keys for multiple data series
}

/**
 * Line configuration for each data series
 */
interface RechartsLineData {
  id: string;                  // Unique identifier
  name: string;                // Display name for legend
  dataKey: string;             // Key in data points for this line's values
  color?: string;              // Line color (default: Recharts default)
  strokeWidth?: number;        // Line thickness (default: 2)
  strokeDasharray?: string;    // Dash pattern (e.g., "5 5" for dashed line)
  dot?: boolean;               // Show dots on data points (default: true)
  activeDot?: boolean;         // Show active dot on hover (default: true)
  data?: RechartsDataPoint[];  // Optional individual data (if not using merged data)
}

/**
 * Configuration props for the RechartsLineGraph component
 */
interface RechartsLineGraphProps {
  lines: RechartsLineData[];                                    // Array of line configurations
  data?: RechartsDataPoint[];                                   // Merged data for all lines (alternative to individual line data)
  width?: number;                                               // Chart width (default: responsive)
  height?: number;                                              // Chart height (default: 400)
  margin?: { top: number; right: number; bottom: number; left: number }; // Chart margins
  xAxisLabel?: string;                                          // X-axis label
  yAxisLabel?: string;                                          // Y-axis label
  xAxisDomain?: [number | string, number | string];            // X-axis domain
  yAxisDomain?: [number | string, number | string];            // Y-axis domain
  showGrid?: boolean;                                           // Show grid lines (default: true)
  showTooltip?: boolean;                                        // Show hover tooltips (default: true)
  showLegend?: boolean;                                         // Show legend (default: true)
  gridStroke?: string;                                          // Grid line color
  gridOpacity?: number;                                         // Grid line opacity (0-1)
  xTickFormatter?: (value: number | string) => string;         // Custom X-axis tick formatter
  yTickFormatter?: (value: number | string) => string;         // Custom Y-axis tick formatter
  tooltipFormatter?: (value: number | string, name: string) => [number | string, string]; // Custom tooltip formatter
  legendWrapperStyle?: React.CSSProperties;                    // Custom legend styling
  responsive?: boolean;                                         // Make chart responsive (default: true)
  animationDuration?: number;                                   // Animation duration in ms (default: 1000)
}

const RechartsLineGraph: React.FC<RechartsLineGraphProps> = ({
  lines,
  data,
  width,
  height = 400,
  margin = { top: 20, right: 30, bottom: 40, left: 40 },
  xAxisLabel,
  yAxisLabel,
  xAxisDomain,
  yAxisDomain,
  showGrid = true,
  showTooltip = true,
  showLegend = true,
  gridStroke = '#e0e0e0',
  gridOpacity = 0.7,
  xTickFormatter,
  yTickFormatter,
  tooltipFormatter,
  legendWrapperStyle,
  responsive = true,
  animationDuration = 1000
}) => {
  // Process data: if individual line data is provided, merge it; otherwise use provided data
  const processedData = React.useMemo(() => {
    if (data) {
      return data;
    }

    // Merge data from individual lines
    const allXValues = Array.from(
      new Set(
        lines.flatMap(line => line.data?.map(point => point.x) || [])
      )
    ).sort((a, b) => Number(a) - Number(b));

    return allXValues.map(x => {
      const mergedPoint: RechartsDataPoint = { x };
      
      lines.forEach(line => {
        if (line.data) {
          const point = line.data.find(p => p.x === x);
          if (point) {
            mergedPoint[line.dataKey] = point[line.dataKey] || point.y || 0;
            if (point.label && !mergedPoint.label) {
              mergedPoint.label = point.label;
            }
          }
        }
      });

      return mergedPoint;
    });
  }, [data, lines]);

  // Custom tooltip content
  const CustomTooltip = ({ active, payload, label }: {
    active?: boolean;
    payload?: Array<{ value: number | string; name: string; color: string }>;
    label?: number | string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
          <p className="font-semibold">{`${xAxisLabel || 'X'}: ${
            xTickFormatter && label !== undefined ? xTickFormatter(label) : label
          }`}</p>
          {payload.map((entry, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${
                tooltipFormatter 
                  ? tooltipFormatter(entry.value, entry.name)[0]
                  : yTickFormatter 
                    ? yTickFormatter(entry.value)
                    : entry.value
              }`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const ChartComponent = (
    <LineChart
      width={width}
      height={height}
      data={processedData}
      margin={margin}
    >
      {showGrid && (
        <CartesianGrid 
          strokeDasharray="3 3" 
          stroke={gridStroke}
          opacity={gridOpacity}
        />
      )}
      
      <XAxis 
        dataKey="x"
        tickFormatter={xTickFormatter}
        domain={xAxisDomain}
        label={xAxisLabel ? { value: xAxisLabel, position: 'insideBottom', offset: -10 } : undefined}
      />
      
      <YAxis 
        tickFormatter={yTickFormatter}
        domain={yAxisDomain}
        label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'insideLeft' } : undefined}
      />
      
      {showTooltip && <Tooltip content={<CustomTooltip />} />}
      
      {showLegend && (
        <Legend 
          wrapperStyle={legendWrapperStyle}
        />
      )}
      
      {lines.map((line) => (
        <Line
          key={line.id}
          type="linear"
          dataKey={line.dataKey}
          stroke={line.color}
          strokeWidth={line.strokeWidth || 2}
          strokeDasharray={line.strokeDasharray}
          dot={line.dot !== false}
          activeDot={line.activeDot !== false ? { r: 6 } : false}
          name={line.name}
          animationDuration={animationDuration}
        />
      ))}
    </LineChart>
  );

  if (responsive) {
    return (
      <div className="recharts-line-graph-container" style={{ width: '100%', height: height }}>
        <ResponsiveContainer>
          {ChartComponent}
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="recharts-line-graph-container">
      {ChartComponent}
    </div>
  );
};

export default RechartsLineGraph;