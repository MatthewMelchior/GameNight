const serverUrl = require('../constants').serverUrl;
const route = "/api/users";
const url = serverUrl + route;

export const registerUser = async (username, password) => {
  try {
    const response = await fetch(url + '/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    return (data.message);
  } catch (error) {
    return ('Error: ' + error.message);
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(url + '/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    return (data.message);
  } catch (error) {
    return ('Error: ' + error.message);
  }
};

export const logoutUser = async () => {
  try {
    const response = await fetch(url + '/logout', {
      method: 'POST',
      credentials: 'include',
    });
    const data = await response.json();
    return (data.message);
  } catch (error) {
    return ('Error: ' + error.message);
  }
};

export const checkAuthentication = async () => {
  try {
    const response = await fetch(url + '/isAuthenticated', {
      method: 'GET',
      credentials: 'include',
    });
    const data = await response;
    return (data);
  } catch (error) {
    return ('Error: ' + error.message);
  }
};
