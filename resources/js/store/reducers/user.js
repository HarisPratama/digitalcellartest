import axios from "axios";
import { setUserLoading, setUsers, setUserLoadError } from "../actions/user";

const initialState = {
	users: {},
	user: {},
    loading: false,
    error: null,
};

const usersReducers = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_USERS':
			return { ...state, users: action.payload };
		case 'SET_USER':
			return { ...state, user: action.payload };
		case 'SET_USER_LOAD':
			return { ...state, loading: action.payload };
		case 'SET_USER_LOAD_ERROR':
			return { ...state, error: action.payload };
		default:
			return state;
	}
};

export default usersReducers;

export function fetchUsers(page) {
	return async (dispatch) => {
		dispatch(setUserLoading(true));
        const token = localStorage.getItem('access_token')

		try {
			const getData = await axios.get(`/api/users?page=${page}`, {
                headers: {
                    Authorization : `Bearer ${token}`
                }
            });

			if (getData.data) {
				dispatch(setUsers(getData.data));
				dispatch(setUserLoading(false));
			}
		} catch (error) {
			// dispatch(setUserLoadError(error));
			dispatch(setUserLoading(false));
		}

	};
}

export function updateUser(payload) {
	return async (dispatch) => {
		dispatch(setUserLoading(true));
        const token = localStorage.getItem('access_token')

		try {
			const getData = await axios.put(`/api/users/${payload.id}`, payload, {
                headers: {
                    Authorization : `Bearer ${token}`
                }
            });

			if (getData.data) {
				dispatch(setUserLoading(false));
			}
		} catch (error) {
			// dispatch(setUserLoadError(error));
			dispatch(setUserLoading(false));
		}

	};
}
export function deleteUser(id) {
	return async (dispatch) => {
		dispatch(setUserLoading(true));
        const token = localStorage.getItem('access_token')

		try {
			const getData = await axios.delete(`/api/users/${id}`, {
                headers: {
                    Authorization : `Bearer ${token}`
                }
            });

			if (getData.data) {
				dispatch(setUserLoading(false));
			}
		} catch (error) {
			// dispatch(setUserLoadError(error));
			dispatch(setUserLoading(false));
		}

	};
}
