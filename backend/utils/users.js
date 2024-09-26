const minPasswordLength = 8;
const minUserLength = 8;
const maxUserLength = 25;

const hasSpecialCharacter = (password) => {
  const specialCharPattern = /[!@#$%^&*(),.?":{}|<>`~/*-+=_]/; // Add any other special characters you want to include
  return specialCharPattern.test(password);
};

const isAlphanumeric = (username) => {
  const alphanumericPattern = /^[a-zA-Z0-9]+$/; // Only allows letters and numbers
  return alphanumericPattern.test(username);
};

const isValidPassword = (password) => {
  return password.length >= minPasswordLength 
  && hasSpecialCharacter(password);
};

const isValidUsername = (username) => {
  return username.length >= minUserLength 
  && username.length <= maxUserLength 
  && isAlphanumeric(username);
}

module.exports = { isValidPassword, isValidUsername };