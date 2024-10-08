import React from 'react';
import '../Styles/GameCard.css';
import '../Styles/Grid.css';

const GameCard = ({ game, onView, onDelete }) => {

  return (
    <div className="game-card-container">
      <div className="game-card-game-info">
        <h2 className="game-card-game-title">{game.name}</h2>
        <p className="game-card-game-date">
          Created on: {new Date(game.createdAt).toLocaleDateString()}
        </p>
        <p className="game-card-game-date">
          Last updated: {new Date(game.updatedAt).toLocaleDateString()}
        </p>
      </div>
      <div className="game-card-game-actions">
        <button className="game-card-game-btn game-card-view-btn" onClick={() => onView(game.id)}>
          View Game
        </button>
        <button className="game-card-game-btn game-card-delete-btn" onClick={() => onDelete(game.id)}>
          Delete Game
        </button>
      </div>
    </div>
  );
};

export default GameCard;
