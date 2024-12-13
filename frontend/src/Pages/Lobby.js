import React, { useEffect, useState } from 'react';
import socket from '../utils/socket';

import { useAuth } from '../utils/AuthContext';

import Subbanner from '../Components/Subbanner';
import InitLobby from '../Components/Lobby/InitLobby';
import CreateLobby from '../Components/Lobby/CreateLobby';
import JoinLobby from '../Components/Lobby/JoinLobby';

import '../Styles/Grid.css'
import '../Styles/Home.css'
import '../Styles/Lobby.css';
import LobbyRoom from '../Components/Lobby/LobbyRoom';

function Lobby() {

  const { isAuthenticated, checkAuth } = useAuth();
  const [action, setAction] = useState('init');
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
   * > on similar note, make sure that user cannot join lobby multiple times (and have the same user in the user list multiple times)
   * Instead of the randomly generated user id, users should be able to set their own names/default to their user names. 
   * 
   */


  // #region Listeners
  // Listen for when a new user joins the lobby
  socket.on('update_users', (data) => {
    console.log(data.users);
    setUsers(data.users);
  });
  // #endregion

  // #region Handlers
  // turn into handle leave lobby eventually
  const handleBack = () => setAction("init")

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

  const handleLeaveLobby = () => {
    socket.emit('leave_lobby', lobbyCode, (response) => {
      setAction('init');
      setUsers([]);
      setLobbyId(null);
    });

  };

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
              isLoading={isLoading}
              handleBack={handleBack}
              selectedGame={selectedGame}
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
            />
          )}
        </div>
      </div>

    </div>
  );
}

export default Lobby;
