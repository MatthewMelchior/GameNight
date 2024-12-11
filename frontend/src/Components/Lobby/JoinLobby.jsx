import React, { useState } from 'react';
import socket from '../../utils/socket';

const JoinLobby = ({ JoinLobbyHandler }) => {
  const [lobbyCode, setLobbyCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle joining a lobby
  const joinLobby = () => {
    setIsLoading(true);
    setError(null);

    // Emit the join_lobby event to the backend with the lobby code
    socket.emit('join_lobby', lobbyCode, (response) => {
      if (response.error) {
        setError(response.error); // Set any error from the server
      } else {
        JoinLobbyHandler(lobbyCode);
      }
      setIsLoading(false); // Stop loading after response
    });
  };

  return (
    <div>
      <h1>Join a Lobby</h1>

      <div>
        <input
          type="text"
          placeholder="Enter Lobby Code"
          value={lobbyCode}
          onChange={(e) => setLobbyCode(e.target.value)}
          disabled={isLoading}
        />
        <button onClick={joinLobby} disabled={isLoading || !lobbyCode}>
          {isLoading ? 'Joining...' : 'Join Lobby'}
        </button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default JoinLobby;
