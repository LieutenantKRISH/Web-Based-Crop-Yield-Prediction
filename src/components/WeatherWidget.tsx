import React, { useEffect, useState } from 'react';
import { Cloud, CloudRain, Sun, Thermometer } from 'lucide-react';

interface WeatherData {
  location: string;
  currentTemp: number;
  condition: 'sunny' | 'cloudy' | 'rainy';
  rainfall: number;
  humidity: number;
  forecast: {
    day: string;
    temp: number;
    condition: 'sunny' | 'cloudy' | 'rainy';
  }[];
}

const mockWeatherData: WeatherData = {
  location: 'Springfield Farm',
  currentTemp: 24,
  condition: 'sunny',
  rainfall: 2.4,
  humidity: 68,
  forecast: [
    { day: 'Today', temp: 24, condition: 'sunny' },
    { day: 'Mon', temp: 22, condition: 'cloudy' },
    { day: 'Tue', temp: 19, condition: 'rainy' },
    { day: 'Wed', temp: 21, condition: 'cloudy' },
    { day: 'Thu', temp: 25, condition: 'sunny' },
  ]
};

const WeatherIcon: React.FC<{ condition: 'sunny' | 'cloudy' | 'rainy'; size?: number }> = ({ condition, size = 24 }) => {
  switch (condition) {
    case 'sunny':
      return <Sun size={size} className="text-yellow-500" />;
    case 'cloudy':
      return <Cloud size={size} className="text-gray-500" />;
    case 'rainy':
      return <CloudRain size={size} className="text-blue-500" />;
    default:
      return null;
  }
};

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setWeather(mockWeatherData);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-pulse text-green-600">Loading weather data...</div>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="text-center p-4 text-gray-500">
        Unable to load weather data
      </div>
    );
  }

  return (
    <div className="rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-green-500 p-4 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold">{weather.location}</h3>
            <div className="flex items-center">
              <Thermometer className="h-4 w-4 mr-1" />
              <span>{weather.currentTemp}°C</span>
            </div>
          </div>
          <WeatherIcon condition={weather.condition} size={36} />
        </div>
      </div>
      
      <div className="p-3 bg-white">
        <div className="flex justify-between mb-3">
          <div className="text-xs text-gray-500">Rainfall</div>
          <div className="text-xs font-medium">{weather.rainfall} mm</div>
        </div>
        <div className="flex justify-between mb-4">
          <div className="text-xs text-gray-500">Humidity</div>
          <div className="text-xs font-medium">{weather.humidity}%</div>
        </div>
        
        <div className="border-t pt-3">
          <div className="text-xs font-medium mb-2">5-Day Forecast</div>
          <div className="flex justify-between">
            {weather.forecast.map((day, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="text-xs font-medium">{day.day}</div>
                <WeatherIcon condition={day.condition} size={16} />
                <div className="text-xs mt-1">{day.temp}°</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;