import { Canvas } from "@react-three/fiber";
import { ARButton, XR } from "@react-three/xr";
import XrHitModel from "./XrHitModel";
import { useState, useEffect } from "react";

const XrHitModelContainer = () => {
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check WebXR support (works on iOS Safari & Android Chrome)
    if (navigator.xr) {
      navigator.xr.isSessionSupported("immersive-ar").then((supported) => {
        setIsSupported(supported);
      });
    }
  }, []);

  return (
    <>
      {isSupported ? (
        <>
          <ARButton
            sessionInit={{
              // iOS REQUIRES 'dom-overlay' for AR
              requiredFeatures: ["hit-test", "dom-overlay"],
              optionalFeatures: ["local-floor"],
              domOverlay: { root: document.body },
            }}
            className="ar-button"
          />
          <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
            <XR>
              <XrHitModel />
            </XR>
          </Canvas>
        </>
      ) : (
        <div className="unsupported-message">
          AR not supported. Use <strong>Safari on iOS 13+</strong> or <strong>Chrome on Android</strong>.
        </div>
      )}
    </>
  );
};

export default XrHitModelContainer;