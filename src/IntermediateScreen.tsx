import React from 'react';

interface IntermediateScreenProps {
  onNext: () => void;
  onBack: () => void;
  onClose: () => void;
}

const IntermediateScreen: React.FC<IntermediateScreenProps> = ({ onNext, onBack, onClose }) => {
  return (
    <div className="min-h-screen bg-agriculture bg-cover bg-center flex items-center justify-center">
      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-2xl max-w-2xl w-full animate-float">
        <img
          src="/logo_1609334560.png" // Placeholder: Replace with actual logo path
          alt="IILM University Logo"
          className="mx-auto mb-6 w-32 cursor-pointer"
          onClick={onNext}
        />
        <h2 className="text-2xl font-bold text-green-800 text-center mb-4">
          HarvestPredict - Project Overview
        </h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Placeholder figures: Replace with your images */}
          <img
            src="/1.jpg"
            alt="Agriculture Figure 1"
            className="w-full h-40 object-cover rounded-md"
          />
          <img
            src="/2.jpg"
            alt="Agriculture Figure 2"
            className="w-full h-40 object-cover rounded-md"
          />
          <img
            src="/3.jpeg"
            alt="Agriculture Figure 3"
            className="w-full h-40 object-cover rounded-md"
          />
          <img
            src="4.jpg"
            alt="Agriculture Figure 4"
            className="w-full h-40 object-cover rounded-md"
          />
        </div>
        <p className="text-gray-600 text-center mb-6">
          Click the IILM University logo to proceed to the prediction model.
        </p>
        <div className="flex justify-between">
          <button
            onClick={onBack}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-200"
          >
            Back
          </button>
          <button
            onClick={onNext}
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200"
          >
            Next
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

export default IntermediateScreen;