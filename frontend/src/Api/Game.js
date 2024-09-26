const serverUrl = require('../constants').serverUrl;
const route = "/api/games";
const url = serverUrl + route;

// Fetch user's games (replace with your actual API endpoint)
export const getUsersGames = async () => {
  try {
    const response = await fetch(url + '/', {
      method: 'GET',
      credentials: 'include'
    })
    const data = await response.json();
    return data;
  }
  catch (error) {
    return ('Error: ' + error.message);
  }
}