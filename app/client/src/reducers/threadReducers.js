import { SET_THREADS } from "../actions/types";

const initialState = {
	list: []
};

export default function(state = initialState, action) {
	switch(action.type) {
		case SET_THREADS: 
			return {
				...state,
				list: action.payload
			};
		default:
			return state;
	}
}