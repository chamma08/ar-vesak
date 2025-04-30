import { useState, useEffect } from 'react';

const EnhancedARCompatibilityChecker = () => {
  const [compatibility, setCompatibility] = useState({
    webXRSupported: false,
    arQuickLookSupported: false,
    arCoreSupported: false,
    isIOS: false,
    isAndroid: false,
    iosVersion: null,
    browserName: ''
  });

  useEffect(() => {
    // Detect browser
    const getBrowserName = () => {
      const userAgent = navigator.userAgent;
      let browserName = "unknown";
      
      if (userAgent.match(/chrome|chromium|crios/i)) {
        browserName = "chrome";
      } else if (userAgent.match(/firefox|fxios/i)) {
        browserName = "firefox";
      } else if (userAgent.match(/safari/i)) {
        browserName = "safari";
      } else if (userAgent.match(/opr\//i)) {
        browserName = "opera";
      } else if (userAgent.match(/edg/i)) {
        browserName = "edge";
      }
      
      return browserName;
    };

    // Check if running on iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
    // Check if running on Android
    const isAndroid = /Android/.test(navigator.userAgent);
    
    // Get iOS version if on iOS
    let iosVersion = null;
    if (isIOS) {
      const match = navigator.userAgent.match(/OS (\d+)_(\d+)_?(\d+)?/);
      iosVersion = match ? parseInt(match[1], 10) : null;
    }
    
    // Check if ARKit Quick Look is supported (iOS 11+)
    // Safari on iOS 12+ supports USDZ files, iOS 11 could potentially use AR Quick Look via web
    const arQuickLookSupported = isIOS && iosVersion >= 11;
    
    // Check if ARCore is likely supported (Android 7.0+ with Google Play Services for AR)
    // This is a basic check - actual ARCore support requires Google Play Services for AR
    const arCoreSupported = isAndroid && parseFloat(navigator.userAgent.match(/Android\s([0-9.]*)/)[1]) >= 7.0;
    
    // Get browser name
    const browserName = getBrowserName();
    
    // Check WebXR support
    const checkWebXR = async () => {
      let webXRSupported = false;
      
      if (navigator.xr) {
        try {
          webXRSupported = await navigator.xr.isSessionSupported('immersive-ar');
        } catch (error) {
          console.error('Error checking WebXR support:', error);
        }
      }
      
      setCompatibility({
        webXRSupported,
        arQuickLookSupported,
        arCoreSupported,
        isIOS,
        isAndroid,
        iosVersion,
        browserName
      });
    };
    
    checkWebXR();
  }, []);

  return compatibility;
};

export default EnhancedARCompatibilityChecker;