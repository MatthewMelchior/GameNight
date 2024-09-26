// Banner.js
import {React, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import '../Styles/Subbanner.css'; // Optional: Add styles for your banner

const Subbanner = () => {

  const { isAuthenticated, checkAuth } = useAuth();

  useEffect(() => {
      checkAuth();
  }, []);

  return (
    <div className="subbanner">
      {String(isAuthenticated)}
      <nav>
        <ul>
          {isAuthenticated ? (
            <div>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/Auth">Auth</Link></li>
              <li><Link to="/Game">Game</Link></li>
              <li><Link to="/Profile">Profile</Link></li>
            </div>
          ) : (
            <div><li><Link to="/">Home</Link></li>
              <li><Link to="/Auth">Auth</Link></li>
              <li><Link to="/Game">Game</Link></li>
            </div>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Subbanner;
