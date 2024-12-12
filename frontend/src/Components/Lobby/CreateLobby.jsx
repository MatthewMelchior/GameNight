import React, { useState, useEffect } from 'react';

const CreateLobby = ({ handleCreateLobby, setSelectedGame, isLoading, handleBack, selectedGame }) => {

  // call the get games api here?
  const userGames = ['Trivia Game 1', 'Trivia Game 2', 'Trivia Game 3'];

  return (
    <div>
      <h2>Create a Lobby</h2>
      <label className="label">Select a Game:</label>
      <select
        className="input"
        value={selectedGame}
        onChange={(e) => setSelectedGame(e.target.value)}
      >
        <option value="">Select your game</option>
        {userGames.map((game, index) => (
          <option key={index} value={game}>
            {game}
          </option>
        ))}
      </select>
      <button
        className="button"
        disabled={!selectedGame && !isLoading}
        onClick={handleCreateLobby}
      >
        Create Game
      </button>
      <button className="button back-button" onClick={handleBack}>
        Back
      </button>
    </div>
  );
}

export default CreateLobby;