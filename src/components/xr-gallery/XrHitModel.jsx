import { OrbitControls, PerspectiveCamera, useGLTF, Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Interactive, useHitTest, useXR } from "@react-three/xr";
import { useRef, useState, useEffect } from "react";
import ModelFallback from "./ModelFallback";  // Import the fallback model
import { Euler, MathUtils } from "three";

const XrHitModel = () => {
  const reticleRef = useRef();
  const [models, setModels] = useState([]);
  const [showGuide, setShowGuide] = useState(true);
  const [placementReady, setPlacementReady] = useState(false);

  const { isPresenting } = useXR();

  // Set up camera for non-AR view
  useThree(({ camera }) => {
    if (!isPresenting) {
      camera.position.set(0, 1.5, 5);
      camera.lookAt(0, 0, 0);
    }
  });

  // Handle hit test for AR mode
  useHitTest((hitMatrix, hit) => {
    if (reticleRef.current) {
      hitMatrix.decompose(
        reticleRef.current.position,
        reticleRef.current.quaternion,
        reticleRef.current.scale
      );

      reticleRef.current.rotation.set(-Math.PI / 2, 0, 0);
      
      // Show ready for placement indicator
      if (!placementReady) {
        setPlacementReady(true);
      }
    }
  });

  // Handle model placement
  const placeModel = (e) => {
    let position = e.intersection.object.position.clone();
    let id = Date.now();
    
    // Create new model with random rotation
    const randomRotation = new Euler(
      0,
      MathUtils.randFloat(0, Math.PI * 2),
      0
    );
    
    setModels([{ position, id, rotation: randomRotation }]);
    
    // Hide the guide after placement
    setShowGuide(false);
  };

  // Show guide again when entering AR mode
  useEffect(() => {
    if (isPresenting) {
      setShowGuide(true);
      setPlacementReady(false);
    }
  }, [isPresenting]);

  return (
    <>
      {/* Controls for non-AR view */}
      {!isPresenting && (
        <>
          <OrbitControls 
            enableDamping
            dampingFactor={0.1}
            minDistance={2}
            maxDistance={10}
          />
          <PerspectiveCamera makeDefault position={[0, 1.5, 3]} />
          <hemisphereLight intensity={0.5} />
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={1} 
            castShadow 
            shadow-mapSize={[1024, 1024]}
          />
        </>
      )}
      
      {/* Common lighting */}
      <ambientLight intensity={0.4} />
      
      {/* AR Mode: Placed models */}
      {isPresenting &&
        models.map(({ position, id, rotation }) => {
          return <ModelFallback key={id} position={position} rotation={rotation} />;
        })}
      
      {/* AR Mode: Placement indicator */}
      {isPresenting && (
        <Interactive onSelect={placeModel}>
          <mesh 
            ref={reticleRef} 
            rotation-x={-Math.PI / 2}
            visible={placementReady}
          >
            <ringGeometry args={[0.1, 0.25, 32]} />
            <meshStandardMaterial 
              color={placementReady ? "#4ade80" : "#ffffff"} 
              emissive={placementReady ? "#22c55e" : "#ffffff"} 
              emissiveIntensity={0.5}
              transparent
              opacity={0.8}
            />
          </mesh>
        </Interactive>
      )}
      
      {/* AR Mode: Placement guide */}
      {isPresenting && showGuide && (
        <Html center position={[0, 0, -2]}>
          <div className="bg-black/70 backdrop-blur-md text-white p-4 rounded-xl text-center w-64 shadow-xl">
            <div className="mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
            </div>
            <p className="font-medium mb-1">Scan your environment</p>
            <p className="text-sm text-white/70">Point at a flat surface and tap when the green ring appears</p>
          </div>
        </Html>
      )}

      {/* Non-AR Mode: Default model view */}
      {!isPresenting && <ModelFallback />}
    </>
  );
};

export default XrHitModel;