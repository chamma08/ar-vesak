const XRCompatibilityCheck = ({ isSupported }) => {
    if (!isSupported) {
      return (
        <div className="unsupported-message">
          AR not supported. Use <strong>Safari on iOS 13+</strong> or <strong>Chrome on Android</strong>.
        </div>
      );
    }
    return null;
  };
  
  export default XRCompatibilityCheck;