import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getUsersGames, createGame, deleteUserGame } from '../Api/Game'

import { useAuth } from '../utils/AuthContext';

import Banner from '../Components/Banner'
import Subbanner from '../Components/Subbanner';
import GameCard from '../Components/GameCard';

import '../Styles/Grid.css'
import '../Styles/Games.css'

function Games() {

  const [games, setGames] = useState([]);
  const { isAuthenticated } = useAuth();

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
      getUsersGames().then((data) => {
        setGames(data);
      });
    }).catch((error) => {
      console.error('Error creating game:', error);  // Handle error if necessary
    });
  };

  return (
    <div>
      <Subbanner
        isAuthenticated={isAuthenticated}
      />
      <div className="grid-container">
        <div className="game-card-list-container flex-row-wrap">
          {games.length > 0 && (
            games.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onView={onViewGame}
                onDelete={onDeleteGame}
              />
            )))
          }
          {games.length !== 0 &&
            <div onClick={createNewGame} className="add-game-card-container">
              Click here to add a new question!
            </div>
          }
        </div>
        {games.length === 0 &&
          <div className="colspan-1">
            <p>No games created yet. Click "Create New Game" to get started!</p>
          </div>
        }
      </div>
    </div >
  )
}

export default Games;
