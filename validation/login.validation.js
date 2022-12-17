const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = data => {
  let error = '';

  // Use validator function to convert empty fields to empty string

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  // Check if email is empty
  if (validator.isEmpty(data.email)) {
    error = 'Email is required';
  } else if (!validator.isEmail(data.email)) {
    error = 'Email is invalid!'
  }

  // Check if password is empty
  else if (validator.isEmpty(data.password)) {
    error = 'Password is required';
  } 

  return {
    error,
    isValid: error == ''
  };
};