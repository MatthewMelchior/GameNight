import React from 'react';

import { useAuth } from '../utils/AuthContext';

import Subbanner from '../Components/Subbanner';
import JoinLobby from '../Components/Lobby/JoinLobby';

import '../Styles/Grid.css'
import '../Styles/Home.css'


function Home() {

  const { isAuthenticated } = useAuth();

  return (
    <div>
      <Subbanner 
        isAuthenticated={isAuthenticated}
      />
      <div className="grid-container">
      </div>
    </div>
  );
}

export default Home;
