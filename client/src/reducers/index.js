import { combineReducers } from 'redux';
import authReducer from './authReducers';
import errorReducer from './errorReducers';
import messageReducers from './messageReducers';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  message: messageReducers
});