import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { FaCalendar, FaWater, FaLeaf, FaThermometerHalf, FaGlobe, FaSeedling } from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface MainScreenProps {
  onBack: () => void;
  onClose: () => void;
}

const MainScreen: React.FC<MainScreenProps> = ({ onBack, onClose }) => {
  const [formData, setFormData] = useState({
    Year: '',
    average_rain_fall_mm_per_year: '',
    pesticides_tonnes: '',
    avg_temp: '',
    Area: '',
    Item: ''
  });
  const [prediction, setPrediction] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setPrediction(null);
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setPrediction(data.prediction);
      }
    } catch (err) {
      setError('Failed to connect to the server');
    }
  };

  const chartData = {
    labels: ['Predicted Yield', 'Average Yield'],
    datasets: [
      {
        label: 'Yield (hg/ha)',
        data: [
          prediction || 0,
          formData.Item === 'Maize' ? 40000 :
          formData.Item === 'Potatoes' ? 35000 :
          formData.Item === 'Wheat' ? 30000 : 25000
        ],
        backgroundColor: ['rgba(34, 197, 94, 0.6)', 'rgba(107, 114, 128, 0.6)'],
        borderColor: ['rgba(34, 197, 94, 1)', 'rgba(107, 114, 128, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Crop Yield Comparison' },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: 'Yield (hg/ha)' } },
    },
  };

  return (
    <div className="min-h-screen bg-agriculture bg-cover bg-center flex flex-col items-center py-8">
      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-2xl w-full max-w-md animate-float">
        <header className="text-center mb-6">
          <img
            src="/logo_1609334560.png"
            alt="IILM University Logo"
            className="mx-auto w-24 mb-4"
          />
          <h1 className="text-2xl font-bold text-green-800">
            HarvestPredict - Crop Yield Prediction
          </h1>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FaCalendar className="absolute left-3 top-3 text-green-600" />
            <input
              type="number"
              name="Year"
              value={formData.Year}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 bg-green-50 shadow-sm placeholder-green-400"
              placeholder="Year (e.g., 2026)"
              required
              min="1990"
            />
          </div>
          <div className="relative">
            <FaWater className="absolute left-3 top-3 text-green-600" />
            <input
              type="number"
              name="average_rain_fall_mm_per_year"
              value={formData.average_rain_fall_mm_per_year}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 bg-green-50 shadow-sm placeholder-green-400"
              placeholder="Rainfall (mm/year)"
              required
              min="51"
              max="3240"
            />
          </div>
          <div className="relative">
            <FaLeaf className="absolute left-3 top-3 text-green-600" />
            <input
              type="number"
              name="pesticides_tonnes"
              value={formData.pesticides_tonnes}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 bg-green-50 shadow-sm placeholder-green-400"
              placeholder="Pesticides (tonnes)"
              required
              min="0"
              max="367778"
            />
          </div>
          <div className="relative">
            <FaThermometerHalf className="absolute left-3 top-3 text-green-600" />
            <input
              type="number"
              name="avg_temp"
              value={formData.avg_temp}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 bg-green-50 shadow-sm placeholder-green-400"
              placeholder="Temperature (°C)"
              required
              min="1.3"
              max="50.65"
              step="0.01"
            />
          </div>
          <div className="relative">
            <FaGlobe className="absolute left-3 top-3 text-green-600" />
            <select
              name="Area"
              value={formData.Area}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 bg-green-50 shadow-sm"
              required
            >
              <option value="">Select Area</option>
              {[
                'Albania', 'Algeria', 'Angola', 'Argentina', 'Armenia', 'Australia', 'Austria',
                'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Belarus', 'Belgium',
                'Botswana', 'Brazil', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cameroon',
                'Canada', 'Central African Republic', 'Chile', 'Colombia', 'Croatia',
                'Denmark', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Eritrea',
                'Estonia', 'Finland', 'France', 'Germany', 'Ghana', 'Greece', 'Guatemala',
                'Guinea', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'India', 'Indonesia', 'Iraq',
                'Ireland', 'Italy', 'Jamaica', 'Japan', 'Kazakhstan', 'Kenya', 'Latvia',
                'Lebanon', 'Lesotho', 'Libya', 'Lithuania', 'Madagascar', 'Malawi', 'Malaysia',
                'Mali', 'Mauritania', 'Mauritius', 'Mexico', 'Montenegro', 'Morocco',
                'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua',
                'Niger', 'Norway', 'Pakistan', 'Papua New Guinea', 'Peru', 'Poland', 'Portugal',
                'Qatar', 'Romania', 'Rwanda', 'Saudi Arabia', 'Senegal', 'Slovenia',
                'South Africa', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden',
                'Switzerland', 'Tajikistan', 'Thailand', 'Tunisia', 'Turkey', 'Uganda',
                'Ukraine', 'United Kingdom', 'Uruguay', 'Zambia', 'Zimbabwe'
              ].map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>
          <div className="relative">
            <FaSeedling className="absolute left-3 top-3 text-green-600" />
            <select
              name="Item"
              value={formData.Item}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 bg-green-50 shadow-sm"
              required
            >
              <option value="">Select Crop</option>
              {[
                'Maize', 'Potatoes', 'Rice, paddy', 'Sorghum', 'Soybeans', 'Wheat', 'Cassava',
                'Sweet potatoes', 'Plantains and others', 'Yams'
              ].map(item => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition duration-200 font-semibold"
          >
            Predict Yield
          </button>
        </form>

        <div className="mt-4 text-sm text-gray-600">
          <p>
            <strong>Note:</strong> Predictions for years beyond 2013 are based on historical data
            (1990–2013). Accuracy may vary due to changes in climate or technology.
          </p>
        </div>

        {prediction !== null && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md text-center animate-fadeIn">
            <h2 className="text-xl font-semibold text-green-800">
              Predicted Yield: {prediction.toFixed(2)} hg/ha
            </h2>
            <div className="mt-4">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        )}
        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md text-center animate-fadeIn">
            <h2 className="text-xl font-semibold text-red-800">Error: {error}</h2>
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={onBack}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-200"
          >
            Back
          </button>
          <button
            onClick={onClose}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainScreen;