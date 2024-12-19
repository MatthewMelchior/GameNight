// socketHandler.js
const lobbies = {};

const handleSocketConnection = (io) => {
  io.on("connection", (socket) => {
    console.log('A user connected', socket.id);

    socket.on('create_lobby', (username, callback) => {
      const lobbyId = generateUniqueLobbyId(); // You can use a function to generate a unique lobby ID
      lobbies[lobbyId] = {
        host: username,
        users: [username],
        status: 'waiting', // Waiting for players
      };

      socket.join(lobbyId); // The host joins the lobby room
      io.to(lobbyId).emit('update_users', { users: lobbies[lobbyId].users });

      // Send lobby ID back to the client
      callback({ lobbyId });
    });

    socket.on("join_lobby", (lobbyId, username, callback) => {
      if (lobbies[lobbyId] && !lobbies[lobbyId].users.includes(username)) {
        lobbies[lobbyId].users.push(username);
        socket.join(lobbyId); // Join the socket room for the lobby
        io.to(lobbyId).emit('update_users', { users: lobbies[lobbyId].users });
        callback({ success: true, lobby: lobbies[lobbyId] });
      } else {
        callback({ error: 'Lobby not found!' }); // Send an error message back
      }
    });

    socket.on("leave_lobby", (lobbyId, username, callback) => {
      if (lobbies[lobbyId]) {
        if (lobbies[lobbyId].host === username) // Person leaving is host 
        {
          if (lobbies[lobbyId].users.length === 1) {
            socket.leave(lobbyId);
            delete lobbies[lobbyId];
          }
          else {
            socket.leave(lobbyId);
            const index = lobbies[lobbyId].users.indexOf(username);
            lobbies[lobbyId].users.splice(index, 1);
            lobbies[lobbyId].host = lobbies[lobbyId].users[0];
            io.to(lobbyId).emit('update_users', { users: lobbies[lobbyId].users });
          }
        }
        else {
          socket.leave(lobbyId);
          const index = lobbies[lobbyId].users.indexOf(username);
          lobbies[lobbyId].users.splice(index, 1);
          io.to(lobbyId).emit('update_users', { users: lobbies[lobbyId].users });
        }

        callback({ success: true });
      }
    });

    socket.on("setup_game", (lobbyId, username, gameData) => {
      if (lobbies[lobbyId] && lobbies[lobbyId].host == username) {
        lobbies[lobbyId].game = gameData;
        lobbies[lobbyId].state = {
          status: "waiting for host",
          question: 1,
        }
        io.to(lobbyId).emit('start_game', { users: lobbies[lobbyId], state: lobbies[lobbyId].state });
      }
    })

    socket.on('start_game', (lobbyId) => {
      io.to(lobbyId).emit('game_started');
    });

    socket.on('navigate_into_game', (lobbyId, username, callback) => {
      if (lobbies[lobbyId] && lobbies[lobbyId]) {
        if (username == lobbies[lobbyId].host) {
          callback({ state: lobbies[lobbyId].state, isHost: true });
        } else {
          callback({ state: lobbies[lobbyId].state, isHost: false });
        }
      }
    })

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
