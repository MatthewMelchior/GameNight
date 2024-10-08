import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { registerUser, loginUser, logoutUser } from '../Api/User';

import Banner from '../Components/Banner'
import Subbanner from '../Components/Subbanner';

import { useAuth } from '../utils/AuthContext';

import '../Styles/Grid.css'
import '../Styles/Auth.css'
import '../Styles/Home.css'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const { isAuthenticated, checkAuth } = useAuth();

  const navigate = useNavigate(); // Hook to navigate to other routes

  const handleRegister = async () => {
    let result = await registerUser(username, password);
    setMessage(result);
  };

  const handleLogin = async () => {
    let result = await loginUser(username, password);
    if (result === "Login successful") {
      checkAuth();
      navigate("/Games");
    } 
    setMessage(result);
  };

  const handleLogout = async () => {
    let result = await logoutUser();
    setMessage(result);
    checkAuth();
  };

  // Toggle between sign-in and sign-up views
  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
  };

  useEffect(() => {
    checkAuth();
  }, [])


  return (
    <div>
      <Banner title="Trivia Night" />
      <Subbanner
        isAuthenticated={isAuthenticated}
      />

      <div className="auth-container">
        <div className="auth-card">
          <h1>{isSignUp ? 'Sign Up' : 'Sign In'}</h1>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="auth-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
          />

          <div className="auth-actions">
            {isSignUp ? (
              <button onClick={handleRegister} className="auth-button">Register</button>
            ) : (
              <button onClick={handleLogin} className="auth-button">Login</button>
            )}
            <button onClick={handleLogout} className="auth-button">Logout</button>
          </div>

          <div className="auth-toggle">
            <span>{isSignUp ? 'Already have an account?' : "Don't have an account?"}</span>
            <button onClick={toggleAuthMode} className="auth-link">
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </div>

          {message && <p className="auth-message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
