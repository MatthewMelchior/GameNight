import React, { useState } from 'react';
import '../../Styles/Grid.css'
import '../../Styles/GameViewer.css'

const GameTitle = ({ game, handleTitleChange }) => {

  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const handleTitleEdit = () => {
    setIsEditingTitle(true);
  };

  const handleTitleSave = () => {
    // Function to save the updated title to the backend
    setIsEditingTitle(false);
  }

  return (
    <div className='grid-container game-title-container block'>
      <div className="game-title-text-container">
        {isEditingTitle ? (
          <input
            type="text"
            className="game-title"
            value={this}
            onChange={e => handleTitleChange(e)}
            onBlur={handleTitleSave} // Save on blur
            autoFocus
          />
        ) : (
          <div className="game-title" onClick={handleTitleEdit}>{game?.name}</div>
        )}
        <div className="game-subtitle-container">
          <span className="date-info">Created on: {new Date(game?.createdAt).toLocaleDateString()}</span>
          <span className="date-info">Last edited on: {new Date(game?.updatedAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default GameTitle;
