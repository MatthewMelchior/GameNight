import { useState, useEffect } from 'react';

const InitLobby = ({ setAction }) => {

  return (
    <div>
      <h2>Welcome to the Lobby</h2>
      <button className="button" onClick={() => setAction("create")}>
        Create Lobby
      </button>
      <button className="button" onClick={() => setAction("join")}>
        Join Lobby
      </button>
    </div>
  );
};

export default InitLobby;