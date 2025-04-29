import React, { Suspense, useState } from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import ModelFallback from './ModelFallback';
import LoadingScreen from './LoadingScreen';

const FallbackViewer = () => {
  const [autoRotate, setAutoRotate] = useState(true);
  
  return (
    <div className="relative w-full h-full">
      {/* Controls overlay */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-black/30 backdrop-blur-md rounded-full px-4 py-2 flex items-center space-x-4">
        <button 
          onClick={() => setAutoRotate(!autoRotate)}
          className={`flex items-center space-x-1 px-3 py-1.5 rounded-full ${autoRotate ? 'bg-indigo-600 text-white' : 'bg-slate-700/50 text-white/70'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span className="text-sm">Auto-Rotate</span>
        </button>
      </div>
      
      {/* Interactive instructions overlay */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 bg-black/30 backdrop-blur-md rounded-lg px-4 py-2 text-white text-center text-sm">
        <p>Drag to rotate • Pinch or scroll to zoom</p>
      </div>
      
      {/* Canvas */}
      <Suspense fallback={<LoadingScreen />}>
        <Canvas className="touch-none">
          <PerspectiveCamera makeDefault position={[0, 1.5, 3]} />
          <OrbitControls 
            enableDamping
            dampingFactor={0.1}
            minDistance={1.5}
            maxDistance={10}
            autoRotate={autoRotate}
            autoRotateSpeed={1}
          />
          
          {/* Scene */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
          <hemisphereLight intensity={0.6} color="#ddeeff" groundColor="#222222" />
          
          {/* Model */}
          <ModelFallback />
          
          {/* Ground */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
            <planeGeometry args={[30, 30]} />
            <meshStandardMaterial 
              color="#f0f0f0"
              metalness={0.1}
              roughness={0.9}
            />
          </mesh>
        </Canvas>
      </Suspense>
    </div>
  );
};

export default FallbackViewer;