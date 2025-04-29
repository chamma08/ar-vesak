import { ARButton } from "@react-three/xr";
import { useEffect, useRef } from "react";

const CustomARButton = ({ className, sessionInit }) => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    // Function to apply custom styles to the ARButton after it's rendered
    const applyCustomStyles = () => {
      if (!containerRef.current) return;
      
      // Find the actual button element that gets created by ARButton
      const buttonElement = containerRef.current.querySelector("button");
      
      if (buttonElement) {
        // Apply our custom classes
        if (className) {
          // Remove default styles that might conflict
          buttonElement.style = "";
          
          // Clear existing classes and apply our custom ones
          buttonElement.className = className;
        }
      }
    };
    
    // Apply styles immediately and also after a short delay
    // (to ensure ARButton has fully rendered)
    applyCustomStyles();
    const timeoutId = setTimeout(applyCustomStyles, 100);
    
    return () => clearTimeout(timeoutId);
  }, [className]);
  
  return (
    <div ref={containerRef}>
      <ARButton
        sessionInit={sessionInit}
      />
    </div>
  );
};

export default CustomARButton;