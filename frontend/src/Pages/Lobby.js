import React, { useEffect, useState } from 'react';
import socket from '../utils/socket';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../utils/AuthContext';

import { getGameInfo } from '../Api/Game';

import Subbanner from '../Components/Subbanner';
import InitLobby from '../Components/Lobby/InitLobby';
import CreateLobby from '../Components/Lobby/CreateLobby';
import JoinLobby from '../Components/Lobby/JoinLobby';

import '../Styles/Grid.css'
import '../Styles/Home.css'
import '../Styles/Lobby.css';
import LobbyRoom from '../Components/Lobby/LobbyRoom';

function Lobby() {

  const { isAuthenticated, username, checkAuth } = useAuth();
  const [action, setAction] = useState('init');
  const [lobbyId, setLobbyId] = useState(null);
  const [lobbyCode, setLobbyCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGame, setSelectedGame] = useState(''); // Tracks the selected game
  const [gameId, setGameId] = useState(-1);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();  // Initialize useNavigate hook

  /**
   * TODO:
   * 
   * > on similar note, make sure that user cannot join lobby multiple times (and have the same user in the user list multiple times)
   * Instead of the randomly generated user id, users should be able to set their own names/default to their user names. 
   * 
   */


  // #region Listeners
  // Listen for when a new user joins the lobby
  socket.on('update_users', (data) => {
    setUsers(data.users);
  });

  socket.on('start_game', (data) => {
    navigate(`/Lobby/${lobbyId}`);
  });

  // #endregion

  // #region Handlers
  // turn into handle leave lobby eventually
  const handleBack = () => setAction("init")

  const handleCreateLobby = () => {
    setIsLoading(true);

    // Emit an event to create a lobby on the server
    socket.emit('create_lobby', username, (response) => {
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
    socket.emit('join_lobby', lobbyCode, username, (response) => {
      if (response.error) {
        setError(response.error); // Set any error from the server
      } else {
        setAction('lobby');
        setLobbyId(lobbyCode);
      }
      setIsLoading(false); // Stop loading after response
    });
  };

  const handleLeaveLobby = () => {
    socket.emit('leave_lobby', lobbyId, username, (response) => {
      setAction('init');
      setUsers([]);
      setLobbyId(null);
    });
  };

  const handleStartGame = () => {
    getGameInfo(gameId).then((data) => {
      //setGame(data.game);
      // Emit "set-up" to socket which adds game to backend, 
      // once "set-up" calls back, send another emit which activates game for everyone in lobby
      // navigate everyone to new page 
      socket.emit('setup_game', lobbyId, username, data);
    });
  }

  // #endregion

  return (
    <div>
      <Subbanner
        isAuthenticated={isAuthenticated}
      />
      <div className="lobby-container">
        <div className="lobby-card">
          {action === 'init' && (
            <InitLobby
              setAction={setAction}
            />
          )}

          {action === 'create' && (
            <CreateLobby
              handleCreateLobby={handleCreateLobby}
              setSelectedGame={setSelectedGame}
              selectedGame={selectedGame}
              isLoading={isLoading}
              handleBack={handleBack}
              setGameId={setGameId}
            />
          )}

          {action === 'join' && (
            <JoinLobby
              handleJoinLobby={handleJoinLobby}
              handleBack={handleBack}
              setLobbyCode={setLobbyCode}
              lobbyCode={lobbyCode}
              isLoading={isLoading}
            />
          )}

          {action === 'lobby' && (
            <LobbyRoom
              handleLeaveLobby={handleLeaveLobby}
              users={users}
              lobbyId={lobbyId}
              username={username}
              handleStartGame={handleStartGame}
            />
          )}
        </div>
      </div>

    </div>
  );
}

export default Lobby;
