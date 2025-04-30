import { useEffect, useState } from 'react';

const ARQuickLook = ({ modelUrl, modelName = "3D Model", iosVersion, browserName }) => {
  const [usdzUrl, setUsdzUrl] = useState('');
  
  useEffect(() => {
    // In a real app, you would have a server-side conversion
    // from GLTF to USDZ for iOS 12+ support
    // Here we're assuming you have a USDZ version available
    const usdzModelUrl = modelUrl.replace('.gltf', '.usdz');
    setUsdzUrl(usdzModelUrl);
  }, [modelUrl]);
  
  const isLegacyIOS = iosVersion >= 11 && iosVersion < 12;
  const isIOSSafari = browserName === 'safari' && iosVersion >= 12;
  
  // Use different approaches based on iOS version and browser
  if (isLegacyIOS) {
    return (
      <div className="ar-quicklook-container">
        <p>Your device supports AR QuickLook.</p>
        <a
          href={`https://developer.apple.com/arkit/gallery/?url=${encodeURIComponent(usdzUrl)}`}
          className="ar-quicklook-button"
          rel="noopener noreferrer"
        >
          View in AR
        </a>
        <p className="helper-text">
          This will open the model in Apple's AR Quick Look gallery.
        </p>
      </div>
    );
  } else if (isIOSSafari) {
    // iOS 12+ with Safari supports AR Quick Look directly
    return (
      <div className="ar-quicklook-container">
        <a
          rel="ar"
          href={usdzUrl}
          className="ar-quicklook-button"
        >
          <img 
            src="/assets/ar-badge.png" 
            alt="AR" 
            className="ar-icon" 
          />
          View in AR
        </a>
      </div>
    );
  } else if (iosVersion >= 12) {
    // iOS 12+ but not Safari (likely Chrome or other browser)
    return (
      <div className="ar-quicklook-container">
        <p>Your device supports AR, but AR Quick Look requires Safari browser.</p>
        <button
          className="ar-quicklook-button"
          onClick={() => {
            window.open(usdzUrl, '_blank');
          }}
        >
          Open in Safari to View in AR
        </button>
      </div>
    );
  }
  
  // Fallback for unsupported browsers/devices
  return (
    <div className="ar-quicklook-container">
      <p>AR Quick Look not supported on this device.</p>
    </div>
  );
};

export default ARQuickLook;