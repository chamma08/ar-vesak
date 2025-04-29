import React from 'react'
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Home from './pages/Home';
import XrHitModelContainer from './components/new/XrHitModelContainer';

function App() {

  return (
    <main className="overflow-hidden text-[#404040]">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/xr-gallery" element={<XrHitModelContainer />} />
      </Routes>
    </main>
  )
}

export default App
