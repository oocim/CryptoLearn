import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Ciphers from './pages/Ciphers';
import './styles/index.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ciphers" element={<Ciphers />} />
            <Route path="/challenges" element={<div>Challenges Page</div>} />
            <Route path="/about" element={<div>About Page</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;