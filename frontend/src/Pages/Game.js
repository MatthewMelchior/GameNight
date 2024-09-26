import React from 'react';
import Banner from '../Components/Banner'
import '../Styles/Grid.css'
import '../Styles/Home.css'
import Subbanner from '../Components/Subbanner';

function Game() {
  return (
    <div>
      <Banner
        title="Trivia Night"
      />
      <Subbanner></Subbanner>
      <h2>Game Page</h2>
    </div>
  );
}

export default Game;
