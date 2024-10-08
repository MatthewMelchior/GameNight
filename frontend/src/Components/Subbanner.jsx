import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import brandImage from '../Assets/trivianighttext.png';
import userImage from '../Assets/user64.png';
import gameImage from '../Assets/task512.png';
import homeImage from '../Assets/home512.png';
import { logoutUser } from '../Api/User';

import '../Styles/Subbanner.css'; // Optional: Add styles for your banner

const Subbanner = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/Login");
  };

  useEffect(() => { }, [isAuthenticated]);

  return (
    <div className="subbanner">
      <div className="subbanner-subdivider" />
      <div className="subbanner-subdivider">
        {/* Brand Image centered */}
        <Link to="/" className="brand-link">
          <img src={brandImage} alt="Trivia Night" className="brand-image" />
        </Link>
      </div>
      <div className="subbanner-subdivider">
        <nav className="nav-right">
          {isAuthenticated ? (
            <div className="nav-items-authenticated">
              <div className='banner-link-container'>
                <img src={gameImage} alt="Games" className="game-icon" />
                <Link className="link-centerer" to="/Games">Games</Link>
              </div>
              <div className='banner-link-container' onClick={handleLogout}>
                <img src={userImage} alt="User" className="user-icon" />
                <span className="link-centerer"  >Sign Out</span>
              </div>
            </div>
          ) : (
            <div className="nav-items-unauthenticated">
              <div className='banner-link-container'>
                <img src={homeImage} alt="Home" className="game-icon" />
                <Link className="link-centerer" to="/">Home</Link>
              </div>
              <div className='banner-link-container'>
                <img src={userImage} alt="User" className="user-icon" />
                <Link className="link-centerer" to="/Login">Login</Link>
              </div>
            </div>
          )}
        </nav>
      </div>



    </div>
  );
};

export default Subbanner;
