// socketHandler.js
const lobbies = {};

const handleSocketConnection = (io) => {
  io.on("connection", (socket) => {
    console.log('A user connected', socket.id);

    socket.on('create_lobby', (callback) => {
      const lobbyId = generateUniqueLobbyId(); // You can use a function to generate a unique lobby ID
      lobbies[lobbyId] = {
        host: socket.id,
        users: [socket.id],
        status: 'waiting', // Waiting for players
      };

      socket.join(lobbyId); // The host joins the lobby room
      io.to(lobbyId).emit('update_users', { users: lobbies[lobbyId].users });

      // Send lobby ID back to the client
      callback({ lobbyId });
    });

    socket.on("join_lobby", (lobbyId, callback) => {
      if (lobbies[lobbyId] && !lobbies[lobbyId].users.includes(socket.id)) {
        lobbies[lobbyId].users.push(socket.id);
        console.log(lobbies[lobbyId]);
        socket.join(lobbyId); // Join the socket room for the lobby
        io.to(lobbyId).emit('update_users', { users: lobbies[lobbyId].users });
        callback({ success: true, lobby: lobbies[lobbyId] });
      } else {
        callback({ error: 'Lobby not found!' }); // Send an error message back
      }
    });

    socket.on("leave_lobby", (lobbyId, callback) => {
      if (lobbies[lobbyId]) {
        socket.leave(lobbyId);
        const index = lobbies[lobbyId].users.indexOf(socket.id);
        lobbies[lobbyId].users.splice(index, 1);
        io.to(lobbyId).emit('update_users', { users: lobbies[lobbyId].users });
        
        callback({ success: true });
      }
    });

    socket.on('start_game', (lobbyId) => {
      io.to(lobbyId).emit('game_started');
    });

    socket.on('submit_answer', ({ lobbyId, answer }) => {
      io.to(lobbyId).emit('answer_submitted', { userId: socket.id, answer });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected', socket.id);
      // Handle user disconnect logic here (e.g., remove from lobby)
    });
  });
};

const generateUniqueLobbyId = () => {
  return Math.random().toString(10).substring(2, 8); // Simple ID generator
};

module.exports = handleSocketConnection;
