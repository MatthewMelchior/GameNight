// Banner.js
import { React, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { logoutUser } from '../Api/User';

import '../Styles/Subbanner.css'; // Optional: Add styles for your banner

const Subbanner = ({ isAuthenticated }) => {

  const navigate = useNavigate(); // Hook to navigate to other routes

  const handleLogout = async () => {
    await logoutUser();
    navigate("/Login");
  };

  useEffect(() => {

  }, [isAuthenticated])

  return (
    <div className="subbanner">
      <nav>
        <ul>
          {isAuthenticated === true ? (
            <div>
              <li><Link to="/Games">Games</Link></li>
              <li onClick={handleLogout}>Sign out</li>
            </div>
          ) : (
            <div>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/Login">Login</Link></li>
            </div>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Subbanner;
