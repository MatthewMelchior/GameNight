import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Banner from '../Components/Banner'
import Subbanner from '../Components/Subbanner';
import { getUsersGames, createGame, deleteUserGame } from '../Api/Game'
import GameCard from '../Components/GameCard';
import '../Styles/Grid.css'

function Games() {

  const [games, setGames] = useState([]);
  const navigate = useNavigate();  // Initialize useNavigate hook

  const onViewGame = (gameId) => {
    navigate(`/Games/${gameId}`);
  };

  const onDeleteGame = (gameId) => {
    deleteUserGame(gameId).then((res) => {
      if (res.ok) {
        setGames((prevGames) => prevGames.filter((game) => game.id !== gameId));
      }
    })
  };


  // Fetch user's games (replace with your actual API endpoint)
  useEffect(() => {
    getUsersGames().then((data) => {
      setGames(data);
    });
  }, []);

  const createNewGame = () => {
    createGame().then((res) => {
      const gameId = res.game;  // Assuming the API response contains the gameId
      navigate(`/Games/${gameId}`);    // Navigate to the game page using the gameId
    }).catch((error) => {
      console.error('Error creating game:', error);  // Handle error if necessary
    });
  };

  return (
    <div>
      <Banner
        title="Trivia Night"
      />
      <Subbanner></Subbanner>

      <h1>Your Games</h1>
      <div>
        <button onClick={createNewGame} className="block">
          Create New Game
        </button>
      </div>
      <div className="grid-container">
        {games.length > 0 ? (
          games.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onView={onViewGame}
              onDelete={onDeleteGame}
            />
          )))
          : (
            <div className="colspan-1">
              <p>No games created yet. Click "Create New Game" to get started!</p>
            </div>
          )}
      </div>
    </div>
  )
}

export default Games;
