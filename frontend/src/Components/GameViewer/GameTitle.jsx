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
        <h1 className="game-title" onClick={handleTitleEdit}>{game?.name}</h1>
      )}
      <span className="date-info">Created on: {new Date(game?.createdAt).toLocaleDateString()}</span>
      <span className="date-info">Last edited on: {new Date(game?.updatedAt).toLocaleDateString()}</span>
    </div>
  );
};

export default GameTitle;
