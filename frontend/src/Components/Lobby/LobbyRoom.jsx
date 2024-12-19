
const LobbyRoom = ({ lobbyId, users, handleLeaveLobby, handleStartGame }) => {

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
        onClick={handleStartGame}
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