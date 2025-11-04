import React, { useState } from 'react';
import { FaLock } from 'react-icons/fa';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

interface IntroScreenProps {
  onPasswordSubmit: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onPasswordSubmit }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === 'my mentor my pride') {
      onPasswordSubmit();
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  // Particle Initialization
  const particlesInit = async (main: any) => {
    await loadFull(main);
  };

  return (
    <div className="min-h-screen bg-agriculture bg-cover bg-center flex items-center justify-center relative overflow-hidden">
      {/* Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          particles: {
            number: { value: 50, density: { enable: true, value_area: 800 } },
            color: { value: '#ffffff' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            move: {
              enable: true,
              speed: 1,
              direction: 'top',
              random: false,
              straight: false,
              out_mode: 'out',
            },
          },
          interactivity: {
            events: {
              onhover: { enable: true, mode: 'repulse' },
              onclick: { enable: true, mode: 'push' },
            },
            modes: {
              repulse: { distance: 100, duration: 0.4 },
              push: { particles_nb: 4 },
            },
          },
          retina_detect: true,
        }}
        className="absolute inset-0 z-0"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-900/50 to-green-600/50 z-0"></div>

      <div className="relative bg-white bg-opacity-95 p-10 rounded-2xl shadow-2xl max-w-md w-full animate-float z-10">
        {/* IILM University Logo */}
        <img
          src="/logo_1609334560.png"
          alt="IILM University Logo"
          className="mx-auto mb-8 w-48 transform hover:scale-105 transition-transform duration-300"
        />
        <h2 className="text-3xl font-bold text-green-900 text-center mb-6 font-poppins">
          HarvestPredict Access
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FaLock className="absolute left-4 top-3.5 text-green-600 text-lg" />
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full pl-12 pr-4 py-3 border border-green-300 rounded-lg bg-green-50 text-green-900 placeholder-green-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 shadow-md hover:shadow-lg"
              required
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center animate-fadeIn">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-all duration-300 font-semibold text-lg shadow-md hover:shadow-xl transform hover:-translate-y-1"
          >
            Unlock
          </button>
        </form>
      </div>
    </div>
  );
};

export default IntroScreen;