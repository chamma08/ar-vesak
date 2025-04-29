import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="flex flex-col items-center justify-center p-8 rounded-xl backdrop-blur-lg bg-white/10">
        <div className="w-24 h-24 mb-6 relative">
          {/* Animated loading spinner */}
          <div className="absolute inset-0 rounded-full border-t-4 border-indigo-500 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-r-4 border-teal-400 animate-spin animation-delay-150"></div>
          <div className="absolute inset-4 rounded-full border-b-4 border-pink-500 animate-spin animation-delay-300"></div>
        </div>
        
        <h1 className="text-2xl font-bold text-white mb-2">Loading AR Experience</h1>
        <p className="text-white/70 text-center max-w-xs">
          Preparing your augmented reality experience...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;