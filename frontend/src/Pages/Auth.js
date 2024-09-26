import React, { useState } from 'react';
import axios from 'axios';
import Banner from '../Components/Banner'
import '../Styles/Grid.css'
import '../Styles/Home.css'
import Subbanner from '../Components/Subbanner';
import { useAuth } from '../utils/AuthContext';

const Auth = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { isAuthenticated, checkAuth } = useAuth();

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      checkAuth();
      setMessage(data.message);
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/logout', {
        method: 'POST',
        credentials: 'include',
      });
      const data = await response.json();
      checkAuth();
      setMessage(data.message);
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  const checkAuthenticated = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/isAuthenticated', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div>
      <Banner
        title="Trivia Night"
      />
      <Subbanner></Subbanner>
      <h1>User Authentication</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>
        <button onClick={handleRegister}>Register</button>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={checkAuthenticated}>check auth</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Auth;
