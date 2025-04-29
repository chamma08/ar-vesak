import React from 'react';

// A simple environment component that doesn't rely on external HDR files
const SimpleEnvironment = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[5, 10, 7.5]} 
        intensity={1} 
        castShadow 
      />
      <hemisphereLight 
        intensity={0.6} 
        color="#ddeeff" 
        groundColor="#222222" 
      />
      <spotLight
        position={[-5, 10, -7.5]}
        angle={0.3}
        penumbra={1}
        intensity={0.8}
        castShadow
      />
    </>
  );
};

export default SimpleEnvironment;