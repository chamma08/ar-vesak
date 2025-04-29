import { useLoader } from "@react-three/fiber";
import { Suspense, useRef, useState, useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Html, useProgress, ContactShadows } from "@react-three/drei";

const ModelLoader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg">
        <div className="text-white text-sm font-medium">
          Loading: {progress.toFixed(0)}%
        </div>
      </div>
    </Html>
  );
};

const ModelFallback = ({ position = [0, 0, 0], rotation }) => {
  const modelRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [scale, setScale] = useState([1, 1, 1]);
  
  // Load the 3D model
  const gltf = useLoader(GLTFLoader, "/m.gltf");
  
  useEffect(() => {
    if (modelRef.current) {
      // Add subtle animation when hovered
      const targetScale = hovered ? [1.05, 1.05, 1.05] : [1, 1, 1];
      setScale(targetScale);
    }
  }, [hovered]);

  // Create a cloned scene to avoid sharing issues
  const model = gltf.scene.clone();

  return (
    <Suspense fallback={<ModelLoader />}>
      <group 
        ref={modelRef}
        position={position} 
        rotation={rotation}
        scale={scale}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <primitive 
          object={model}
          castShadow
          receiveShadow
        />
      </group>
      
      {/* Basic lighting without Environment component */}
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[5, 10, 7.5]} 
        angle={0.3} 
        penumbra={1} 
        intensity={1} 
        castShadow 
        shadow-mapSize={[2048, 2048]}
      />
      <hemisphereLight intensity={0.6} color="#ddeeff" groundColor="#222222" />
      
      <ContactShadows 
        rotation-x={Math.PI / 2}
        position={[0, -0.8, 0]}
        opacity={0.6}
        width={10}
        height={10}
        blur={1.5}
        far={0.8}
      />
    </Suspense>
  );
};

export default ModelFallback;