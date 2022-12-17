const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = data => {
  let error = '';

  // Use validator function to convert empty fields to empty string
  data.name = !isEmpty(data.name) ? data.name: '';
  data.email = !isEmpty(data.email) ? data.email: '';
  data.password = !isEmpty(data.password) ? data.password: '';
  data.password2 = !isEmpty(data.password2) ? data.password2: '';

  // Check if name empty
  if (validator.isEmpty(data.name)) {
    error = 'Name field is required';
  }

  // Check if email empty
  else if (validator.isEmpty(data.email)) {
    error = 'Email field is required';
  } else if (!validator.isEmail(data.email)) {
    error = 'Email is invalid!'
  }

  // Check if password is empty
  else if (validator.isEmpty(data.password)) {
    error = 'Password field is required';
  } 

  // check if confirm password is empty
  else if (validator.isEmpty(data.password2)) {
    error = 'Confirm password is required';
  }

  // Check the length of the password if less than 6 chars
  else if (!validator.isLength(data.password, { min: 6, max: 30 } )) {
    error = 'Password must be at least 6 characters';
  } 

  // Check if the password is same with the confirm password
  else if (!validator.equals(data.password, data.password2)) {
    error = 'Passwords are not the same!';
  }

  return {
    error,
    isValid: error == ''
  };
};