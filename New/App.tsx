import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [formData, setFormData] = useState({
    Year: '',
    avg_temp: '',
    average_rain_fall_mm_per_year: '',
    pesticides_tonnes: '',
    Area: '',
    Item: ''
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/predict', formData);
      setPrediction(res.data.prediction);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 p-4">
      <header className="text-center text-4xl font-bold text-green-800 mb-6">
        🌾 HarvestPredict – Crop Yield Estimator 🌾
      </header>

      <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md mx-auto space-y-4">
        <input type="number" name="Year" placeholder="Year" className="w-full p-2 border rounded" onChange={handleChange} required />
        <input type="number" name="avg_temp" placeholder="Average Temperature (°C)" className="w-full p-2 border rounded" onChange={handleChange} required />
        <input type="number" name="average_rain_fall_mm_per_year" placeholder="Rainfall (mm/year)" className="w-full p-2 border rounded" onChange={handleChange} required />
        <input type="number" name="pesticides_tonnes" placeholder="Pesticides Used (tonnes)" className="w-full p-2 border rounded" onChange={handleChange} required />
        <input type="text" name="Area" placeholder="Country/Area" className="w-full p-2 border rounded" onChange={handleChange} required />
        <input type="text" name="Item" placeholder="Crop" className="w-full p-2 border rounded" onChange={handleChange} required />
        <button type="submit" className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition">
          Predict Yield
        </button>
      </form>

      {prediction && (
        <div className="mt-6 text-lg bg-white p-4 rounded shadow-md text-green-700 font-semibold text-center">
          🌱 Predicted Yield: {prediction} hg/ha
        </div>
      )}

      <footer className="mt-10 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} HarvestPredict | Empowering Farmers with AI
      </footer>
    </div>
  );
};

export default App;
