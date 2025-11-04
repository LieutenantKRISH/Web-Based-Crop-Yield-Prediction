import React, { useEffect, useState } from 'react';

// Simulated data - in a real app, this would come from an API
const generateMockData = () => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  const currentYearData = months.map((month, index) => {
    // Create a bell curve for yield prediction
    const value = index < 6 
      ? 1000 + index * 800 
      : 5800 - (index - 6) * 800;
    const adjustedValue = value + Math.random() * 500 - 250;
    return { month, value: Math.max(0, adjustedValue) };
  });
  
  const previousYearData = currentYearData.map(item => ({
    month: item.month,
    value: item.value * (0.8 + Math.random() * 0.4) // 80-120% of current year
  }));
  
  return { currentYearData, previousYearData };
};

const YieldChart: React.FC = () => {
  const [data, setData] = useState<{
    currentYearData: { month: string; value: number }[];
    previousYearData: { month: string; value: number }[];
  } | null>(null);
  
  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setData(generateMockData());
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Chart dimensions
  const height = 200;
  const padding = { top: 20, right: 20, bottom: 30, left: 40 };
  const chartWidth = 100; // percentage width
  
  if (!data) {
    return (
      <div className="flex justify-center items-center h-52">
        <div className="animate-pulse text-green-600">Loading chart data...</div>
      </div>
    );
  }
  
  // Find max value for scaling
  const allValues = [
    ...data.currentYearData.map(d => d.value),
    ...data.previousYearData.map(d => d.value)
  ];
  const maxValue = Math.max(...allValues);
  
  // Scale value to fit in the chart height
  const scaleY = (value: number) => {
    return height - padding.bottom - (value / maxValue) * (height - padding.top - padding.bottom);
  };
  
  // Generate points for the line
  const generatePoints = (data: { month: string; value: number }[]) => {
    const pointWidth = (chartWidth - padding.left - padding.right) / (data.length - 1);
    
    return data.map((item, index) => {
      const x = padding.left + index * pointWidth;
      const y = scaleY(item.value);
      return { x: `${x}%`, y, value: item.value, month: item.month };
    });
  };
  
  const currentYearPoints = generatePoints(data.currentYearData);
  const previousYearPoints = generatePoints(data.previousYearData);
  
  // Generate SVG path string for lines
  const generatePathD = (points: { x: string; y: number }[]) => {
    return points.map((point, i) => 
      `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' ');
  };
  
  const currentYearPath = generatePathD(currentYearPoints);
  const previousYearPath = generatePathD(previousYearPoints);
  
  // Months for x-axis
  const months = data.currentYearData.map(d => d.month);
  
  return (
    <div className="w-full h-72 relative">
      {/* Chart title and legend */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <div className="flex items-center">
            <span className="block w-3 h-3 bg-green-600 rounded-full mr-2"></span>
            <span className="text-sm text-gray-600">Current Year</span>
          </div>
          <div className="flex items-center">
            <span className="block w-3 h-3 bg-gray-400 rounded-full mr-2"></span>
            <span className="text-sm text-gray-600">Previous Year</span>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          Yield in kg/hectare
        </div>
      </div>
      
      {/* Chart container */}
      <div className="w-full h-full relative overflow-hidden">
        {/* Y-axis labels */}
        <div className="absolute top-0 left-0 h-full flex flex-col justify-between text-xs text-gray-500 pt-4 pb-6">
          <span>{Math.round(maxValue)}</span>
          <span>{Math.round(maxValue * 0.75)}</span>
          <span>{Math.round(maxValue * 0.5)}</span>
          <span>{Math.round(maxValue * 0.25)}</span>
          <span>0</span>
        </div>
        
        {/* Chart grid */}
        <div className="absolute top-0 left-10 right-0 h-full">
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => (
            <div 
              key={index} 
              className="absolute border-t border-gray-200"
              style={{ 
                top: `${padding.top + ratio * (height - padding.top - padding.bottom)}px`,
                width: '100%'
              }}
            ></div>
          ))}
        </div>
        
        {/* SVG for chart lines */}
        <svg 
          className="absolute top-0 left-10 w-[calc(100%-2.5rem)]" 
          height={height}
          style={{ overflow: 'visible' }}
        >
          {/* Previous year line */}
          <path 
            d={previousYearPath} 
            fill="none" 
            stroke="#9CA3AF" 
            strokeWidth="2"
            strokeDasharray="3,3"
          />
          
          {/* Current year line */}
          <path 
            d={currentYearPath} 
            fill="none" 
            stroke="#059669" 
            strokeWidth="2"
          />
          
          {/* Current year data points */}
          {currentYearPoints.map((point, i) => (
            <g key={i}>
              <circle 
                cx={point.x} 
                cy={point.y} 
                r="4" 
                fill="#059669"
              />
              
              {/* Tooltip on hover */}
              <circle 
                cx={point.x} 
                cy={point.y} 
                r="12" 
                fill="transparent"
                className="cursor-pointer group"
              >
                <title>{`${point.month}: ${Math.round(point.value)} kg/ha`}</title>
              </circle>
            </g>
          ))}
        </svg>
        
        {/* X-axis labels */}
        <div 
          className="absolute bottom-0 left-10 right-0 flex justify-between text-xs text-gray-500"
          style={{ paddingLeft: `${padding.left}%`, paddingRight: `${padding.right}%` }}
        >
          {months.map((month, i) => (
            <span key={i} className={i % 2 === 0 ? '' : 'invisible sm:visible'}>
              {month}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YieldChart;