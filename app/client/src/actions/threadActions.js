import axios from 'axios';
import { SET_THREADS, ADD_THREAD } from './types';

export const queryThread = title => dispatch => {
	axios.post('/api/threads/query', {title: title})
		.then(res => {
			var { users, threads } = res.data;
			var data = makeThreads(users, threads);
			dispatch({
				type: SET_THREADS,
				payload: data
			});
		})
		.catch(err => console.log(err));
}

export const addThread = (thread, history) => dispatch => {
	axios.post('/api/threads/add', thread)
		.then(res => {
			dispatch({
				type: ADD_THREAD,
				payload: res.data
			});
			history.push("/list");
		})
		.catch(err => console.log(err));
}

export const makeThreads = (users, threads) => {
	var mp = new Map();
	for(let i = 0; i < users.length; i++)
		mp.set(users[i]._id, users[i].email);
	for(let i = 0; i < threads.length; i++)
		threads[i].user = mp.get(threads[i].user);
	return threads;
}