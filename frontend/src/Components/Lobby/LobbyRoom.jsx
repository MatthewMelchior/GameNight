import { useState, useEffect } from 'react';
import socket from '../../utils/socket';

const LobbyRoom = ({ lobbyId }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Listen for when a new user joins the lobby
    socket.on('user_joined', (data) => {
      console.log("user joined:", data.userId);
      setUsers((prev) => [...prev, data.userId]);
    });

    // Listen for when the game is started
    socket.on('game_started', () => {
      console.log("Game started");
      // Move to quiz view logic here
    });

    // Cleanup the specific event listeners when the component unmounts or lobbyId changes
    return () => {
      socket.off('user_joined'); // Remove listener for 'user_joined'
      socket.off('game_started'); // Remove listener for 'game_started'
    };
  }, [lobbyId]); // Ensure this useEffect runs when lobbyId changes

  return (
    <div>
      <h1>Lobby {lobbyId}</h1>
      {JSON.stringify(users)}
      <ul>
        {users?.map((user, idx) => (
          <li key={idx}>User {user}</li>
        ))}
      </ul>
      <button onClick={() => socket.emit('start_game', lobbyId)}>Start Game</button>
    </div>
  );
};

export default LobbyRoom;