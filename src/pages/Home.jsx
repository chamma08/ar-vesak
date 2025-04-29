import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Homee() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/xr-gallery");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="w-full px-4 py-3 absolute top-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo on the left */}
          <div className="flex items-center">
            <div className="font-bold text-xl flex items-center">
              <img src="logo.png" alt="Eventiva Logo" className="h-16 w-16" />
            </div>
          </div>

          {/* Navigation on right - simplified to match image */}
          <div className="flex items-center gap-4">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-md font-medium text-sm">
              ABOUT
            </button>
            <button className="text-white p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </button>
            
          </div>
        </div>
      </header>

      {/* Hero Section with dramatic music festival look */}
      <section className="relative w-full h-screen overflow-hidden bg-gradient-to-r from-black via-gray-900 to-black">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="bg.jpg"
            alt="Concert performer"
            className="w-full h-full object-cover opacity-70"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 relative z-10 h-full flex flex-col md:flex-row justify-center items-center">
          {/* Left side content */}
          <div className="max-w-2xl md:w-1/2">
            <h2 className="font-cursive text-4xl mb-2 text-white">VESAK</h2>
            <h1 className="text-6xl md:text-7xl font-bold mb-4">
              <span className="text-orange-500">Festival</span>
              <br />
              <span className="text-white">2025</span>
            </h1>
            {/* Added button using navigate function */}
            <button 
              onClick={handleNavigate}
              className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium text-lg transition-all duration-300 transform hover:scale-105"
            >
              Try Out AR
            </button>
          </div>
          
          {/* Right side image */}
          <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center md:justify-end">
            <div className="relative">
              <img 
                src="festival-image.png" 
                alt="Festival Experience" 
                className="max-h-96 object-contain rounded-lg shadow-lg z-10 relative"
              />
              {/* Optional decorative element */}
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-orange-500 rounded-lg opacity-20"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}