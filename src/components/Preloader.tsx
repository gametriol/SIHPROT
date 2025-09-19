import React from 'react';

const Preloader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        <img src="/logo-removebg-preview.svg" alt="Medi-Mantra" className="w-36 h-36 object-contain mb-4" />
        <div className="animate-pulse text-gray-600">Loading Medi-Mantra...</div>
      </div>
    </div>
  );
};

export default Preloader;
