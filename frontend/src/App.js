import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext'; // Import the AuthProvider
import Home from './Pages/Home';
import Auth from './Pages/Auth';
import Game from './Pages/Game';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Auth" element={<Auth />} />
          <Route path="/Game" element={<Game />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
