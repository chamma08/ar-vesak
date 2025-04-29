import React from 'react';

const InfoOverlay = ({ arSupported, onDismiss }) => {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header with logo */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 p-5 flex items-center">
          <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">AR Model Viewer</h2>
            <p className="text-white/70 text-sm">Interactive 3D Experience</p>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {arSupported ? (
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white">AR Compatible</h3>
                  <p className="text-white/70 text-sm">Your device supports augmented reality</p>
                </div>
              </div>
              
              <div className="bg-slate-700/50 rounded-lg p-4 text-white/90">
                <h3 className="font-semibold mb-2">How to use:</h3>
                <ol className="list-decimal ml-5 space-y-2 text-sm">
                  <li>Tap the "Start AR" button below</li>
                  <li>Point your camera at a flat surface</li>
                  <li>When the ring appears, tap to place the model</li>
                  <li>Move around to view the 3D model from different angles</li>
                </ol>
              </div>
            </div>
          ) : (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6">
              <div className="flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 className="font-semibold text-white">AR Not Supported</h3>
              </div>
              <p className="text-white/70 text-sm">
                Your device or browser doesn't support WebXR augmented reality. 
                You can still view the 3D model in standard view mode.
              </p>
            </div>
          )}
          
          <div className="text-center">
            <button
              onClick={onDismiss}
              className="w-full py-3 px-6 bg-gradient-to-r from-orange-600 to-orange-800 text-white font-medium rounded-lg shadow transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
            >
              {arSupported ? "Continue to AR Experience" : "View 3D Model"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoOverlay;