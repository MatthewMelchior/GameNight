import React, { useState, useEffect } from 'react';
import { getUsersGames } from '../../Api/Game'

const CreateLobby = ({ handleCreateLobby, setSelectedGame, selectedGame, isLoading, handleBack, setGameId }) => {

  const [games, setGames] = useState([]);

  const handleSelect = (gameId) => {
    const name = games.filter((x) => x.id == gameId);
    setSelectedGame(name[0]?.name);
    setGameId(gameId);
  }

  // Fetch user's games 
  useEffect(() => {
    getUsersGames().then((data) => {
      setGames(data);
    });
  }, []);

  return (
    <div>
      <h2>Create a Lobby</h2>
      <label className="label">Select a Game:</label>
      <select
        className="input"
        value={selectedGame}
        onChange={(e) => handleSelect(e.target.value)}
      >
        <option value="">Select your game</option>
        {games.map((game, index) => (
          <option key={index} value={game.id}>
            {game.name}
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