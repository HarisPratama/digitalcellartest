export function setUsers(payload) {
	return (dispatch) => {
		dispatch({
			type: 'SET_USERS',
			payload,
		});
	};
}

export function setUser(payload) {
	return (dispatch) => {
		dispatch({
			type: 'SET_USER',
			payload,
		});
	};
}

export function setUserLoading(payload) {
	return (dispatch) => {
		dispatch({
			type: 'SET_USER_LOADING',
			payload,
		});
	};
}

export function setUserLoadError(payload) {
	return (dispatch) => {
		dispatch({
			type: 'SET_USER_LOAD_ERROR',
			payload,
		});
	};
}