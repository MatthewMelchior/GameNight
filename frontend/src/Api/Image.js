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

export const uploadImageArray = async (filesArray) => {
  if (!filesArray || filesArray.length == 0) return {"fileNames": []};
  try {
    const formData = new FormData();

    // Loop through the array and append each file to FormData

    filesArray.forEach((file) => {
      formData.append('files', file);
    });

    const response = await fetch(url + '/arr/', {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    if (response.ok) {
      return response.json();
    } else {
      console.log('Error uploading files:', response.statusText);
    }
  } catch (error) {
    console.log('File upload error: ' + error);
  }
}
