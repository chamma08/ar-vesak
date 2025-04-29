import React from 'react';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 p-4">
      <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-6 max-w-md text-center shadow-lg">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
        
        <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
        <p className="text-white/70 mb-4">
          There was an issue loading the 3D experience. This might be due to hardware limitations or browser compatibility.
        </p>
        
        <div className="bg-black/20 rounded-lg p-3 mb-6 text-left">
          <p className="text-sm font-mono text-red-300 overflow-x-auto">
            {error.message.split('\n')[0]}
          </p>
        </div>
        
        <button
          onClick={resetErrorBoundary}
          className="w-full py-3 px-6 bg-gradient-to-r from-red-600 to-red-500 text-white font-medium rounded-lg shadow transition-all duration-300 hover:shadow-lg"
        >
          Try Again
        </button>
        
        <p className="mt-4 text-sm text-white/50">
          If the problem persists, try refreshing the page or using a different browser.
        </p>
      </div>
    </div>
  );
};

export default ErrorFallback;