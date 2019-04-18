import { combineReducers } from 'redux';
import authReducer from './authReducer';
import threadReducer from './threadReducers';

export default combineReducers({
	auth: authReducer,
	list: threadReducer
});