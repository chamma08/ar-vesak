import { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { XR } from "@react-three/xr";
import XrHitModel from "./XrHitModel";
import LoadingScreen from "./LoadingScreen";
import InfoOverlay from "./InfoOverlay";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ErrorFallback";
import FallbackViewer from "./FallbackViewer";
import CustomARButton from "./CustomARButton";

const AppContainer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [deviceSupport, setDeviceSupport] = useState({
    arSupported: false,
    checkComplete: false
  });
  const [showInfo, setShowInfo] = useState(true);

  useEffect(() => {
    // Check AR support
    const checkARSupport = async () => {
      try {
        // Check if WebXR is supported with AR
        const supported = 
          'xr' in navigator && 
          typeof navigator.xr?.isSessionSupported === 'function' && 
          await navigator.xr.isSessionSupported('immersive-ar');
        
        setDeviceSupport({
          arSupported: supported,
          checkComplete: true
        });
      } catch (error) {
        console.log('AR support check error:', error);
        setDeviceSupport({
          arSupported: false,
          checkComplete: true
        });
      }
      
      // Simulate loading screen for better UX
      setTimeout(() => setIsLoading(false), 1500);
    };

    checkARSupport();
  }, []);

  const handleDismissInfo = () => {
    setShowInfo(false);
  };

  const handleShowInfo = () => {
    setShowInfo(true);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="relative w-full h-full">
          {/* Info button */}
          {!showInfo && (
            <button 
              onClick={handleShowInfo}
              className="absolute top-4 right-4 z-30 bg-white/20 backdrop-blur-md p-2 rounded-full shadow-lg text-white"
              aria-label="Show information"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          )}
          
          {/* Info overlay */}
          {showInfo && (
            <InfoOverlay 
              arSupported={deviceSupport.arSupported} 
              onDismiss={handleDismissInfo} 
            />
          )}
          
          {/* Canvas container */}
          <div className="w-full h-full">
            {deviceSupport.arSupported && (
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                <CustomARButton
                  className="px-6 py-3 bg-orange-500 mb-20 hover:bg-orange-700 text-white font-medium rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
                  sessionInit={{
                    requiredFeatures: ["hit-test"],
                  }}
                />
              </div>
            )}
            
            {deviceSupport.arSupported ? (
              <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={() => window.location.reload()}
              >
                <Suspense fallback={<LoadingScreen />}>
                  <Canvas className="touch-none">
                    <XR>
                      <XrHitModel />
                    </XR>
                  </Canvas>
                </Suspense>
              </ErrorBoundary>
            ) : (
              <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={() => window.location.reload()}
              >
                <FallbackViewer />
              </ErrorBoundary>
            )}
          </div>
          
          {/* Footer attribution */}
          <div className="absolute bottom-2 w-full text-center mt-10 text-xs text-white/50">
            <p>© 2025 AIR STUDIOS</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppContainer;