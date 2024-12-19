import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext'; // Import the AuthProvider
import AuthGuard from './utils/AuthGuard';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Games from './Pages/Games';
import GameViewer from './Pages/GameViewer';
import Lobby from './Pages/Lobby';
import StartedLobby from './Pages/StartedLobby';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Games" element={<AuthGuard Component={Games} />} />
          <Route path="/Games/:gameId" element={<AuthGuard Component={GameViewer} />} />
          <Route path="/Lobby" element={<AuthGuard Component={Lobby} />} />
          <Route path="/Lobby/:lobbyId" element={<AuthGuard Component={StartedLobby} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
