import React from 'react';

const GameCard = ({ game, onView, onDelete }) => {

  return (
    <div className="colspan-3 block">
      <h2>{game.name}</h2>
      <p>Created on: {new Date(game.createdAt).toLocaleDateString()}</p>
      <button onClick={() => onView(game.id)}>View Game</button>
      <button onClick={() => onDelete(game.id)}>Delete Game</button>
    </div>
  );
};

export default GameCard;
