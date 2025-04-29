import { useLoader } from "@react-three/fiber";
import { Suspense } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import ErrorBoundary from "./ErrorBoundary"; // Remove the named import

const Model = ({ position = [0, 0, 0] }) => {
  const gltf = useLoader(GLTFLoader, "/m.gltf");
  
  return (
    <ErrorBoundary fallback={null}>
      <Suspense fallback={null}>
        <primitive position={position} object={gltf.scene} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default Model;