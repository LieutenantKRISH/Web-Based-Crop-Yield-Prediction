import React, { useState } from 'react';
import axios from 'axios';

const YieldForm: React.FC = () => {
  const [formData, setFormData] = useState({
    average_rain_fall_mm_per_year: '',
    pesticides_tonnes: '',
    avg_temp: '',
    Area: '',
    Item: '',
  });

  const [prediction, setPrediction] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/predict', formData);
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Prediction failed:', error);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: 'average_rain_fall_mm_per_year', label: 'Average Rainfall (mm/year)' },
          { name: 'pesticides_tonnes', label: 'Pesticides Used (tonnes)' },
          { name: 'avg_temp', label: 'Average Temperature (°C)' },
        ].map(({ name, label }) => (
          <div key={name}>
            <label className="block font-medium">{label}</label>
            <input
              type="number"
              name={name}
              value={(formData as any)[name]}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
        ))}

        <div>
          <label className="block font-medium">Region</label>
          <input
            type="text"
            name="Area"
            value={formData.Area}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Crop Type</label>
          <input
            type="text"
            name="Item"
            value={formData.Item}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Predict Yield
        </button>
      </form>

      {prediction !== null && (
        <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded text-green-800 text-lg font-semibold">
          🌱 Predicted Yield: {prediction.toFixed(2)} hg/ha
        </div>
      )}
    </div>
  );
};

export default YieldForm;
