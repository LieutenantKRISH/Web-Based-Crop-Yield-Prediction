import React, { useState, useEffect } from 'react';
import { Menu, LayoutDashboard, X, User } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <LayoutDashboard className="h-8 w-8 text-green-700 mr-2" />
            <span className="font-bold text-xl text-green-800">HarvestPredict</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-green-800 hover:text-green-600 transition-colors font-medium">Dashboard</a>
            <a href="#" className="text-green-800 hover:text-green-600 transition-colors font-medium">Predictions</a>
            <a href="#" className="text-green-800 hover:text-green-600 transition-colors font-medium">Historical Data</a>
            <a href="#" className="text-green-800 hover:text-green-600 transition-colors font-medium">Settings</a>
          </nav>
          
          <div className="hidden md:flex items-center">
            <button className="flex items-center text-green-800 hover:text-green-600 transition-colors">
              <User className="h-5 w-5 mr-1" />
              <span>Account</span>
            </button>
          </div>
          
          <button 
            className="md:hidden text-green-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`fixed inset-0 bg-white z-50 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 md:hidden`}>
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center">
            <LayoutDashboard className="h-8 w-8 text-green-700 mr-2" />
            <span className="font-bold text-xl text-green-800">HarvestPredict</span>
          </div>
          <button onClick={() => setIsMenuOpen(false)}>
            <X className="h-6 w-6 text-green-800" />
          </button>
        </div>
        <nav className="p-4 flex flex-col space-y-4">
          <a href="#" className="text-green-800 hover:text-green-600 transition-colors font-medium py-2">Dashboard</a>
          <a href="#" className="text-green-800 hover:text-green-600 transition-colors font-medium py-2">Predictions</a>
          <a href="#" className="text-green-800 hover:text-green-600 transition-colors font-medium py-2">Historical Data</a>
          <a href="#" className="text-green-800 hover:text-green-600 transition-colors font-medium py-2">Settings</a>
          <a href="#" className="text-green-800 hover:text-green-600 transition-colors font-medium py-2 flex items-center">
            <User className="h-5 w-5 mr-1" />
            <span>Account</span>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;