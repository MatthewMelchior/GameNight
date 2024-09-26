import React, { useEffect, useState } from 'react';
import Banner from '../Components/Banner'
import Subbanner from '../Components/Subbanner';
import '../Styles/Grid.css'
import { getUsersGames } from '../Api/Game'
import FileUpload from '../Components/FileUpload';

function Games() {

  const [games, setGames] = useState([]);

  // Fetch user's games (replace with your actual API endpoint)
  useEffect(() => {
    getUsersGames().then((data) => {
      setGames(data);
    });
  }, []);

  const createNewGame = () => {
    // Redirect to game creation page or handle the game creation logic here
    console.log('Create New Game');
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
        <FileUpload/>
      </div>
      <div className="grid-container">
        {games.length > 0 ? (
          games.map((game) => (
            <div key={game.id} className="colspan-2 block">
              <h2>{game.title}</h2>
              <p>Created on: {new Date(game.createdAt).toLocaleDateString()}</p>
              <button>View Game</button>
              <button>Edit Game</button>
              <button>Delete Game</button>
            </div>
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
