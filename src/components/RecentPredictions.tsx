import React from 'react';
import { ArrowUp, ArrowDown, Dot, ChevronRight } from 'lucide-react';

interface Prediction {
  id: string;
  cropType: string;
  date: string;
  predictedYield: number;
  change: number;
  fieldName: string;
}

const mockPredictions: Prediction[] = [
  {
    id: 'pred-1',
    cropType: 'Corn',
    date: '2025-06-10',
    predictedYield: 9800,
    change: 5.2,
    fieldName: 'North Field'
  },
  {
    id: 'pred-2',
    cropType: 'Wheat',
    date: '2025-06-08',
    predictedYield: 4500,
    change: -2.1,
    fieldName: 'East Field'
  },
  {
    id: 'pred-3',
    cropType: 'Soybeans',
    date: '2025-06-05',
    predictedYield: 3700,
    change: 1.8,
    fieldName: 'South Field'
  }
];

const RecentPredictions: React.FC = () => {
  return (
    <div className="space-y-3">
      {mockPredictions.map((prediction) => (
        <div 
          key={prediction.id}
          className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium text-green-800">{prediction.cropType}</div>
              <div className="text-xs text-gray-500">{prediction.fieldName} • {new Date(prediction.date).toLocaleDateString()}</div>
            </div>
            <div className="text-right">
              <div className="font-medium">{prediction.predictedYield.toLocaleString()} kg/ha</div>
              <div className={`flex items-center text-xs ${prediction.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {prediction.change >= 0 ? (
                  <ArrowUp className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDown className="h-3 w-3 mr-1" />
                )}
                <span>{Math.abs(prediction.change)}% from previous</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <button 
        className="w-full text-center text-sm text-green-600 hover:text-green-800 mt-2 py-2 flex items-center justify-center"
      >
        View all predictions
        <ChevronRight className="h-4 w-4 ml-1" />
      </button>
    </div>
  );
};

export default RecentPredictions;