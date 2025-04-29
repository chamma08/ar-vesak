import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Interactive, useHitTest, useXR } from "@react-three/xr";
import { useRef, useState, useEffect } from "react";
import Model from "./Model";

const XrHitModel = () => {
  const reticleRef = useRef();
  const [models, setModels] = useState([]);
  const { isPresenting } = useXR();
  const [hitTestReady, setHitTestReady] = useState(false);

  useThree(({ camera }) => {
    if (!isPresenting) {
      camera.position.set(0, 0, 3);
    }
  });

  useHitTest((hitMatrix, hit) => {
    if (!reticleRef.current) return;
    
    hitMatrix.decompose(
      reticleRef.current.position,
      reticleRef.current.quaternion,
      reticleRef.current.scale
    );
    reticleRef.current.rotation.set(-Math.PI / 2, 0, 0);
    setHitTestReady(true);
  });

  const placeModel = (e) => {
    if (!e.intersection?.object?.position) return;
    
    const position = e.intersection.object.position.clone();
    const id = Date.now();
    setModels([{ position, id }]);
  };

  useEffect(() => {
    return () => {
      setModels([]);
      setHitTestReady(false);
    };
  }, [isPresenting]);

  return (
    <>
      {!isPresenting && <OrbitControls />}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {isPresenting && hitTestReady && models.map(({ position, id }) => (
        <Model key={id} position={position} />
      ))}
      
      {isPresenting && hitTestReady && (
        <Interactive onSelect={placeModel}>
          <mesh ref={reticleRef} rotation-x={-Math.PI / 2} visible={models.length === 0}>
            <ringGeometry args={[0.1, 0.25, 32]} />
            <meshStandardMaterial color="white" />
          </mesh>
        </Interactive>
      )}

      {!isPresenting && <Model />}
    </>
  );
};

export default XrHitModel;