import React from 'react';
import '../../Styles/Grid.css'
import '../../Styles/GameViewer.css'

const GameInfo = ({ game }) => {

  return (
    <div className="grid-container block game-info">
      <span className="date-info">Created on: {new Date(game?.createdAt).toLocaleDateString()}</span>
      <span className="date-info">Last edited on: {new Date(game?.updatedAt).toLocaleDateString()}</span>
    </div>
  );
};

export default GameInfo;
