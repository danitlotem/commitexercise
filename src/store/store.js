import {createStore} from 'redux';
let state = {
	name: '',
	phone: '',
	isValidPassword: false,
	isConfirm: false,
	message: '',
	status: '',
};

const Reducer = (state, action) => {
	if (action.type === 'UPDATE_DETAILS') {
		return {
			...state,
			name: action.name,
			phone: action.phone,
			status: action.status,
		};
	}
	if (action.type === 'SET_PASSWORD_VELIDITY') {
		return {
			...state,
			isValidPassword: action.isValidPassword,
		};
	}
	if (action.type === 'SET_PASSWORD_CONFIRM') {
		return {
			...state,
			isConfirm: action.isConfirm,
		};
	}
	if (action.type === 'SET_MESSAGE') {
		return {
			...state,
			message: action.message,
		};
	}
	if (action.type === 'CLEAR') {
		return {
			...state,
			name: action.name,
			phone: action.phone,
			isValidPassword: action.isValidPassword,
			isConfirm: action.isConfirm,
			message: action.message,
			status: action.status,
		};
	}

	return state;
};

const store = createStore(Reducer, state);
export default store;
