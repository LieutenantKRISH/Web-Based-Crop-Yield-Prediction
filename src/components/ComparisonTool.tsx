import React, { useState } from 'react';

type CropVariety = {
  id: string;
  name: string;
  projectedYield: number;
  waterRequirement: number;
  growthPeriod: number;
  costPerHectare: number;
  resistanceScore: number;
};

const mockVarieties: CropVariety[] = [
  {
    id: 'corn-a',
    name: 'Yellow Dent Corn',
    projectedYield: 9500,
    waterRequirement: 500,
    growthPeriod: 90,
    costPerHectare: 850,
    resistanceScore: 7
  },
  {
    id: 'corn-b',
    name: 'Sweet Corn Hybrid',
    projectedYield: 8200,
    waterRequirement: 480,
    growthPeriod: 85,
    costPerHectare: 790,
    resistanceScore: 6
  },
  {
    id: 'wheat-a',
    name: 'Hard Red Winter Wheat',
    projectedYield: 4200,
    waterRequirement: 410,
    growthPeriod: 240,
    costPerHectare: 620,
    resistanceScore: 8
  },
  {
    id: 'wheat-b',
    name: 'Soft White Wheat',
    projectedYield: 4600,
    waterRequirement: 430,
    growthPeriod: 220,
    costPerHectare: 680,
    resistanceScore: 7
  },
  {
    id: 'rice-a',
    name: 'Long Grain Rice',
    projectedYield: 7800,
    waterRequirement: 1200,
    growthPeriod: 120,
    costPerHectare: 1200,
    resistanceScore: 5
  }
];

const ComparisonTool: React.FC = () => {
  const [selectedVarieties, setSelectedVarieties] = useState<string[]>(['corn-a', 'corn-b']);
  
  const handleVarietyChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const newSelectedVarieties = [...selectedVarieties];
    newSelectedVarieties[index] = e.target.value;
    setSelectedVarieties(newSelectedVarieties);
  };
  
  const addComparison = () => {
    if (selectedVarieties.length < 3) {
      // Find a variety not already selected
      const availableVariety = mockVarieties.find(v => !selectedVarieties.includes(v.id));
      if (availableVariety) {
        setSelectedVarieties([...selectedVarieties, availableVariety.id]);
      }
    }
  };
  
  const removeComparison = (index: number) => {
    if (selectedVarieties.length > 1) {
      const newSelectedVarieties = [...selectedVarieties];
      newSelectedVarieties.splice(index, 1);
      setSelectedVarieties(newSelectedVarieties);
    }
  };
  
  // Get the selected varieties data
  const selectedVarietiesData = selectedVarieties.map(id => 
    mockVarieties.find(v => v.id === id)
  ).filter((v): v is CropVariety => v !== undefined);
  
  // Find max values for scaling bars
  const maxYield = Math.max(...mockVarieties.map(v => v.projectedYield));
  const maxWater = Math.max(...mockVarieties.map(v => v.waterRequirement));
  const maxGrowth = Math.max(...mockVarieties.map(v => v.growthPeriod));
  const maxCost = Math.max(...mockVarieties.map(v => v.costPerHectare));
  
  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-6">
        {selectedVarietiesData.map((variety, index) => (
          <div key={index} className="flex-1 min-w-[200px]">
            <div className="flex justify-between items-center mb-2">
              <select
                value={variety.id}
                onChange={(e) => handleVarietyChange(e, index)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 text-sm"
              >
                {mockVarieties.map(v => (
                  <option key={v.id} value={v.id}>{v.name}</option>
                ))}
              </select>
              
              {selectedVarieties.length > 1 && (
                <button
                  onClick={() => removeComparison(index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        ))}
        
        {selectedVarieties.length < 3 && (
          <button
            onClick={addComparison}
            className="flex-1 min-w-[200px] border-2 border-dashed border-gray-300 rounded-md py-2 text-center text-gray-500 hover:border-green-500 hover:text-green-500 transition-colors"
          >
            + Add Variety
          </button>
        )}
      </div>
      
      <div className="space-y-6">
        <ComparisonMetric 
          label="Projected Yield (kg/ha)" 
          values={selectedVarietiesData.map(v => ({
            value: v.projectedYield,
            percentage: (v.projectedYield / maxYield) * 100
          }))}
          colors={['bg-green-500', 'bg-blue-500', 'bg-purple-500']}
          formatFn={(val) => `${val.toLocaleString()} kg`}
        />
        
        <ComparisonMetric 
          label="Water Requirement (mm)" 
          values={selectedVarietiesData.map(v => ({
            value: v.waterRequirement,
            percentage: (v.waterRequirement / maxWater) * 100
          }))}
          colors={['bg-green-500', 'bg-blue-500', 'bg-purple-500']}
          formatFn={(val) => `${val} mm`}
        />
        
        <ComparisonMetric 
          label="Growth Period (days)" 
          values={selectedVarietiesData.map(v => ({
            value: v.growthPeriod,
            percentage: (v.growthPeriod / maxGrowth) * 100
          }))}
          colors={['bg-green-500', 'bg-blue-500', 'bg-purple-500']}
          formatFn={(val) => `${val} days`}
        />
        
        <ComparisonMetric 
          label="Cost per Hectare ($)" 
          values={selectedVarietiesData.map(v => ({
            value: v.costPerHectare,
            percentage: (v.costPerHectare / maxCost) * 100
          }))}
          colors={['bg-green-500', 'bg-blue-500', 'bg-purple-500']}
          formatFn={(val) => `$${val}`}
        />
        
        <div>
          <div className="text-sm font-medium text-gray-700 mb-2">Pest & Disease Resistance</div>
          <div className="flex flex-wrap gap-4">
            {selectedVarietiesData.map((variety, index) => (
              <div key={index} className="flex-1 min-w-[200px]">
                <div className="flex items-center">
                  <div className="flex-1">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                      <span
                        key={star}
                        className={`text-lg ${
                          star <= variety.resistanceScore
                            ? 'text-yellow-500'
                            : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-gray-700 ml-2">
                    {variety.resistanceScore}/10
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ComparisonMetricProps {
  label: string;
  values: {
    value: number;
    percentage: number;
  }[];
  colors: string[];
  formatFn: (value: number) => string;
}

const ComparisonMetric: React.FC<ComparisonMetricProps> = ({
  label,
  values,
  colors,
  formatFn
}) => {
  return (
    <div>
      <div className="text-sm font-medium text-gray-700 mb-2">{label}</div>
      <div className="flex flex-wrap gap-4">
        {values.map((item, index) => (
          <div key={index} className="flex-1 min-w-[200px]">
            <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${colors[index]} transition-all duration-500 ease-in-out`}
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
            <div className="text-sm font-medium mt-1 text-right">
              {formatFn(item.value)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparisonTool;