import React, { useState, useEffect } from 'react';
import socket from '../../utils/socket';

const CreateLobby = ({ JoinLobbyHandler }) => {
  const [isLoading, setIsLoading] = useState(false);

  const createLobby = () => {
    setIsLoading(true);

    // Emit an event to create a lobby on the server
    socket.emit('create_lobby', (response) => {
      setIsLoading(false);
      JoinLobbyHandler(response.lobbyId);
    });
  };

  return (
    <div>
      <h1>Create a Lobby</h1>
      <div>
        <button onClick={createLobby} disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Lobby'}
        </button>
      </div>

    </div>
  );
}

export default CreateLobby;