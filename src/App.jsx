// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ColorGame from './ColorGame';
import Home from './Home';
import About from './About';
import ColorGame01 from './ColorGame01';
import Wallet from './Wallet';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/color-prediction-game" element={<Home />} />
          <Route path="/color-game" element={<ColorGame />} />
          <Route path="/color-game01" element={<ColorGame01 />} />
          <Route path="/about" element={<About />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="*" element={<Navigate to="/color-prediction-game" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
