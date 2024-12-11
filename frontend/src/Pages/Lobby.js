import React, { useEffect, useState } from 'react';
import socket from '../utils/socket';

import { useAuth } from '../utils/AuthContext';

import Subbanner from '../Components/Subbanner';

import '../Styles/Grid.css'
import '../Styles/Home.css'
import '../Styles/Lobby.css';

function Lobby() {

  const { isAuthenticated, checkAuth } = useAuth();
  const [action, setAction] = useState('init');
  const [mode, setMode] = useState();
  const [lobbyId, setLobbyId] = useState(null);
  const [lobbyCode, setLobbyCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGame, setSelectedGame] = useState(''); // Tracks the selected game
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  /**
   * TODO:
   * 
   * For creating lobby, call API which returns list of user's games and adds to drop down.
   * Make sure that if user backs, they leave the lobby.
   * > on similar note, make sure that user cannot join lobby multiple times (and have the same user in the user list multiple times)
   * Instead of the randomly generated user id, users should be able to set their own names/default to their user names. 
   * Clean up this file and abstract out major functions to separate files
   * 
   */

  const userGames = ['Trivia Game 1', 'Trivia Game 2', 'Trivia Game 3'];

  const handleBack = () => setAction("init")

  // Listen for when a new user joins the lobby
  socket.on('user_joined', (data) => {
    console.log(data);
    console.log("user joined:", data.userId);
    setUsers(data.lobby.users);
  });

  const handleCreateLobby = () => {
    setIsLoading(true);

    // Emit an event to create a lobby on the server
    socket.emit('create_lobby', (response) => {
      setIsLoading(false);
      setAction('lobby');
      setLobbyId(response.lobbyId);
    });
  };

  // Function to handle joining a lobby
  const handleJoinLobby = () => {
    setIsLoading(true);
    setError(null);

    // Emit the join_lobby event to the backend with the lobby code
    socket.emit('join_lobby', lobbyCode, (response) => {
      if (response.error) {
        setError(response.error); // Set any error from the server
      } else {
        setAction('lobby');
        setLobbyId(lobbyCode);
      }
      setIsLoading(false); // Stop loading after response
    });
  };


  useEffect(() => {

  }, []);

  return (
    <div>
      <Subbanner
        isAuthenticated={isAuthenticated}
      />
      <div className="lobby-container">
        <div className="lobby-card">
          {action === 'init' && (
            <div>
              <h2>Welcome to the Lobby</h2>
              <button className="button" onClick={() => setAction("create")}>
                Create Lobby
              </button>
              <button className="button" onClick={() => setAction("join")}>
                Join Lobby
              </button>
            </div>
          )}

          {action === 'create' && (
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
          )}

          {action === 'join' && (
            <div>
              <h2>Join a Lobby</h2>
              <label className="label">Enter Lobby Code:</label>
              <input
                type="text"
                placeholder="Enter Lobby Code"
                value={lobbyCode}
                onChange={(e) => setLobbyCode(e.target.value)}
                disabled={isLoading}
              />
              <button
                className="button"
                disabled={isLoading || !lobbyCode}
                onClick={handleJoinLobby}
              >
                Join Lobby
              </button>
              <button className="button back-button" onClick={handleBack}>
                Back
              </button>
            </div>
          )}

          {action === 'lobby' && (
            <div>
              <h2>Lobby - {lobbyId}</h2>
              <label className="label">Players:</label>
              <ul>
                {users?.map((user, idx) => (
                  <li key={idx}>User {user}</li>
                ))}
              </ul>
              <button
                className="button"
                disabled={!lobbyId}
              >
                start game
              </button>
              <button className="button back-button" onClick={handleBack}>
                Back
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

export default Lobby;
