import { combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import newsReducers from './reducers/user';

// const reducers = combineReducers({
// 	news: newsReducers
// });

const reducers = {
	reducer: {
		users: newsReducers,
	}
};

const store = configureStore(reducers, applyMiddleware(thunk));

export default store;
