import React from 'react';

const JoinLobby = ({ handleJoinLobby, handleBack, setLobbyCode, lobbyCode, isLoading }) => {

  return (
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
  );
};

export default JoinLobby;
