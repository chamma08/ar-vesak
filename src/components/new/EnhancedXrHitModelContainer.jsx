import { Canvas } from "@react-three/fiber";
import { ARButton, XR } from "@react-three/xr";
import XrHitModel from "./XrHitModel";
import { useState, useEffect } from "react";
import EnhancedARCompatibilityChecker from "./EnhancedARCompatibilityChecker";
import ARQuickLook from "./ARQuickLook";

const EnhancedXrHitModelContainer = () => {
  // Get AR compatibility information
  const {
    webXRSupported,
    arQuickLookSupported,
    arCoreSupported,
    isIOS,
    isAndroid,
    iosVersion,
    browserName
  } = EnhancedARCompatibilityChecker();

  // The path to your model files
  const modelPath = {
    gltf: "/m.gltf",
    usdz: "/m.usdz", // You'll need to provide a USDZ version of your model for iOS AR QuickLook
    glb: "/m.glb"    // Optional format for some AR implementations
  };

  // Use WebXR when available
  if (webXRSupported) {
    return (
      <>
        <ARButton
          sessionInit={{
            requiredFeatures: ["hit-test", "dom-overlay"],
            optionalFeatures: ["dom-overlay", "local-floor"],
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
    );
  }
  
  // Use AR Quick Look for iOS devices
  if (arQuickLookSupported) {
    return (
      <div className="ar-container">
        <div className="model-preview">
          <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
            <ambientLight />
            <Model />
          </Canvas>
        </div>
        <ARQuickLook
          modelUrl={modelPath.gltf}
          modelName="3D Model"
          iosVersion={iosVersion}
          browserName={browserName}
        />
      </div>
    );
  }
  
  // Use ARCore for Android devices without WebXR
  if (arCoreSupported && !webXRSupported) {
    return (
      <div className="ar-container">
        <div className="model-preview">
          <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
            <ambientLight />
            <Model />
          </Canvas>
        </div>
        <div className="ar-core-message">
          <p>WebXR not supported in this browser, but your device supports ARCore.</p>
          <p>Try using Google Chrome or an ARCore compatible app.</p>
        </div>
      </div>
    );
  }

  // Fallback for unsupported devices
  return (
    <div className="ar-container">
      <div className="model-preview">
        <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
          <ambientLight />
          <Model />
        </Canvas>
      </div>
      <div className="unsupported-message">
        <p>AR not supported on this device or browser.</p>
        {isIOS && (
          <p>For iOS devices, use Safari on iOS 11+ for AR experiences.</p>
        )}
        {isAndroid && (
          <p>For Android devices, use Chrome with ARCore support.</p>
        )}
        {!isIOS && !isAndroid && (
          <p>AR experiences currently require a supported mobile device.</p>
        )}
      </div>
    </div>
  );
};

// Import the Model component
import Model from "./Model";

export default EnhancedXrHitModelContainer;