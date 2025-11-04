import React from 'react';
import PredictionForm from '../components/PredictionForm';
import YieldChart from '../components/YieldChart';
import WeatherWidget from '../components/WeatherWidget';
import ComparisonTool from '../components/ComparisonTool';
import RecentPredictions from '../components/RecentPredictions';

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-start mb-8 flex-col md:flex-row">
          <div>
            <h1 className="text-3xl font-bold text-green-900">Crop Yield Prediction</h1>
            <p className="text-gray-600 mt-2">
              Make data-driven decisions with machine learning-powered predictions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
              <div className="p-6">
                <PredictionForm />
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-green-800 mb-4">Yield Forecast</h2>
                <YieldChart />
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden mt-8">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-green-800 mb-4">Comparative Analysis</h2>
                <ComparisonTool />
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-green-800 mb-4">Weather Forecast</h2>
                <WeatherWidget />
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-green-800 mb-4">Recent Predictions</h2>
                <RecentPredictions />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;