import React, { Suspense } from 'react'
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Home from './pages/Home';
// Import the enhanced version instead of the original
import EnhancedXrHitModelContainer from './components/new/EnhancedXrHitModelContainer';

function App() {
  return (
    <main className="overflow-hidden text-[#404040]">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Replace XrHitModelContainer with EnhancedXrHitModelContainer */}
        <Route 
          path="/xr-gallery" 
          element={
            <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading AR experience...</div>}>
              <EnhancedXrHitModelContainer />
            </Suspense>
          } 
        />
      </Routes>
    </main>
  )
}

export default App