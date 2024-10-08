import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext'; // Import the AuthProvider
import Home from './Pages/Home';
import Login from './Pages/Login';
import Games from './Pages/Games';
import GameViewer from './Pages/GameViewer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Games" element={<Games />} />
          <Route path="/Games/:gameId" element={<GameViewer />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
