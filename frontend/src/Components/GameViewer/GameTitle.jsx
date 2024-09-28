import React from 'react';
import '../../Styles/Grid.css'
import '../../Styles/GameViewer.css'

const GameTitle = ({ isEditingTitle, gameTitle, handleTitleChange, handleTitleSave, handleTitleEdit }) => {

  return (
    <div className='grid-container game-title-container block'>
      {isEditingTitle ? (
        <input
          type="text"
          className="game-title"
          value={gameTitle}
          onChange={handleTitleChange}
          onBlur={handleTitleSave} // Save on blur
          autoFocus
        />
      ) : (
        <h1 className="game-title" onClick={handleTitleEdit}>{gameTitle}</h1>
      )}
    </div>
  );
};

export default GameTitle;
