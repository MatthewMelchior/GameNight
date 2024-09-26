import React, { useState } from 'react';
import Banner from '../Components/Banner'
import '../Styles/Grid.css'
import '../Styles/Home.css'
import Subbanner from '../Components/Subbanner';
import { useAuth } from '../utils/AuthContext';
import { registerUser, loginUser, logoutUser } from '../Api/User';

const Auth = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { checkAuth } = useAuth();

  const handleRegister = async () => {
    let result = await registerUser(username, password);
    setMessage(result);
  };

  const handleLogin = async () => {
    let result = await loginUser(username, password);
    setMessage(result);
    checkAuth();
  };

  const handleLogout = async () => {
    let result = await logoutUser(username, password);
    setMessage(result);
    checkAuth();
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
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Auth;
