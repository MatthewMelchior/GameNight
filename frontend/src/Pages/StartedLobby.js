import React, { useEffect, useState } from 'react';
import socket from '../utils/socket';
import { useNavigate, useParams } from 'react-router-dom';

import { useAuth } from '../utils/AuthContext';

import Subbanner from '../Components/Subbanner';

import '../Styles/Grid.css'
import '../Styles/Home.css'
import '../Styles/Lobby.css';

function StartedLobby() {

  const { lobbyId } = useParams();

  const { isAuthenticated, username, checkAuth } = useAuth();
  const [clientState, setClientState] = useState("init");
  const [isHost, setIsHost] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();  // Initialize useNavigate hook

  // #region Listeners
  // Listen for when a new user joins the lobby
  socket.on('update_state', (data) => {

  });
  // #endregion

  // #region Handlers
  // turn into handle leave lobby eventually

  // #endregion

  // Redirect if not auth'd
  useEffect(() => {
    if (clientState === "init" && username) {
      socket.emit('navigate_into_game', lobbyId, username, (response) => {
        setClientState(response.state);
        setIsHost(response.isHost);
      });
    }
  }, []);

  return (
    <div>
      <Subbanner
        isAuthenticated={isAuthenticated}
      />
      <div className="lobby-container">
        {clientState &&
          <div className="lobby-card">

            {clientState === "init" &&
              <div>
                Loading
              </div>
            }
            {clientState.status === "waiting for host" &&
              <div>
                waiting for host
              </div>
            }

          </div>
        }

        {isHost &&
          <div className="lobby-card">
            You are host
          </div>
        }
      </div>

    </div>
  );
}

export default StartedLobby;
