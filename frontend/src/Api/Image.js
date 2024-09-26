const serverUrl = require('../constants').serverUrl;
const route = "/api/images";
const url = serverUrl + route;

export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(url + '/', {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    if (response.ok) {
      console.log('File uploaded successfully');
    }
  }
  catch (error) {
    console.log('File uploaded error: ' + error);
  }
}