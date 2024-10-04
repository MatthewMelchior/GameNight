import React, { useState } from 'react';
import '../../Styles/Grid.css'
import '../../Styles/GameViewer.css'
import GameLauncher from '../GameLauncher'; 

const QuestionSideBar = ({ game, index, handleSaveGame }) => {

  return (
    <div className="question-sidebar block">
      <div>
      <div className="submit-btn btn" onClick={() => console.log("to do")}>Launch Game</div>
        <div className="submit-btn btn" onClick={handleSaveGame}>Save Game</div>

        <div className="nav-left-btn btn" onClick={handleSaveGame}></div>
        <div className="nav-right-btn btn" onClick={handleSaveGame}></div>
      </div>
    </div>
  );
};

export default QuestionSideBar;
