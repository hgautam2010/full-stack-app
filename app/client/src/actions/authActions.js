import axios from 'axios';
import setAuthToken from "../utils/setAuthToken";
import { queryThread } from './threadActions';
import jwt_decode from "jwt-decode";

import { SET_CURRENT_USER } from "./types";

export const registerUser = (userData, history) => dispatch => {
	axios.post('/api/users/register', userData)
			.then(res => {
				history.push("/login")
			})
			.catch(err => console.log(err));
}

export const loginUser = userData => dispatch => {
	axios.post('/api/users/login', userData)
			.then(res => {
				const { token } = res.data;
				localStorage.setItem('jwtToken', token);
				setAuthToken(token);
				const decoded = jwt_decode(token);
				dispatch(setCurrentUser(decoded));
				dispatch(queryThread(''));
			})
			.catch(err => 
				console.log(err)
			);
}

export const setCurrentUser = (decoded) => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	}
}

export const logoutUser = () => dispatch => {
	localStorage.removeItem('jwtToken');
	setAuthToken(false);
	dispatch(setCurrentUser({}));
}