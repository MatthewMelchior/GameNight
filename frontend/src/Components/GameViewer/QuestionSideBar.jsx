import React, { useState } from 'react';
import '../../Styles/Grid.css'
import '../../Styles/GameViewer.css'
import GameLauncher from '../GameLauncher'; 

const QuestionSideBar = ({ game }) => {

  return (
    <div className="question-sidebar block">
      <div>
        <h2>Launch Game</h2>
        <GameLauncher
          game={game}
        />
      </div>
    </div>
  );
};

export default QuestionSideBar;
