import React from 'react';

import { useAuth } from '../utils/AuthContext';

import Banner from '../Components/Banner'
import Subbanner from '../Components/Subbanner';

import '../Styles/Grid.css'
import '../Styles/Home.css'

function Profile() {

  const { isAuthenticated, checkAuth } = useAuth();

  return (
    <div>
      <Banner
        title="Trivia Night"
      />
      <Subbanner
        isAuthenticated={isAuthenticated}
      />
      <h2>Profile Page</h2>
    </div>
  );
}

export default Profile;
