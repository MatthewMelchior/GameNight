
const LobbyRoom = ({ lobbyId, users, handleLeaveLobby }) => {

  /*
  useEffect(() => {
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
  */

  return (
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
      <button className="button back-button" onClick={handleLeaveLobby}>
        leave lobby
      </button>
    </div>
  );
};

export default LobbyRoom;