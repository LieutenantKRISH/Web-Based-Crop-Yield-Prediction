import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, BarChart3, Sigma } from 'lucide-react';

interface ModelMetricsProps {
  isTraining: boolean;
  epochStats: {
    epoch: number;
    loss: number;
    valLoss: number;
  }[];
}

const ModelMetrics: React.FC<ModelMetricsProps> = ({ isTraining, epochStats }) => {
  const [accuracy, setAccuracy] = useState<number>(0);

  useEffect(() => {
    if (epochStats.length > 0) {
      // Calculate accuracy based on final validation loss
      const finalLoss = epochStats[epochStats.length - 1].valLoss;
      // Convert loss to accuracy (simplified for demo)
      const calculatedAccuracy = Math.max(0, Math.min(100, (1 - finalLoss) * 100));
      setAccuracy(calculatedAccuracy);
    }
  }, [epochStats]);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-green-800 mb-6 flex items-center">
          <Brain className="h-6 w-6 mr-2" />
          Model Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Architecture</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm text-gray-600 whitespace-pre-wrap">
                  {`Neural Network Architecture:
• Input Layer: 6 neurons
  - 4 numerical features
  - 2 categorical features
• Hidden Layer 1: 12 neurons (ReLU)
• Hidden Layer 2: 8 neurons (ReLU)
• Output Layer: 1 neuron (Linear)`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Algorithm Details</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-600 mt-0.5" />
                  <span>Supervised Learning: Feed-forward Neural Network</span>
                </li>
                <li className="flex items-start">
                  <Sigma className="h-5 w-5 mr-2 text-green-600 mt-0.5" />
                  <span>Optimizer: Adam (Learning Rate: 0.001)</span>
                </li>
                <li className="flex items-start">
                  <BarChart3 className="h-5 w-5 mr-2 text-green-600 mt-0.5" />
                  <span>Loss Function: Mean Squared Error</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Training Parameters</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Epochs:</span>
                  <span className="font-medium">50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Batch Size:</span>
                  <span className="font-medium">32</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Training Split:</span>
                  <span className="font-medium">80%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Validation Split:</span>
                  <span className="font-medium">20%</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Model Performance</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Accuracy</span>
                    <span className="font-medium">{accuracy.toFixed(1)}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-full bg-green-600 rounded-full transition-all duration-500"
                      style={{ width: `${accuracy}%` }}
                    ></div>
                  </div>
                </div>

                {epochStats.length > 0 && (
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600">Final Loss</span>
                      <span className="font-medium">
                        {epochStats[epochStats.length - 1].loss.toFixed(4)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Validation Loss</span>
                      <span className="font-medium">
                        {epochStats[epochStats.length - 1].valLoss.toFixed(4)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {isTraining && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-green-600 border-t-transparent mr-2"></div>
              <span className="text-green-700">Training in progress...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelMetrics;