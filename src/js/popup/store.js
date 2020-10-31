import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from "redux-persist";
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger';

import rootReducer from './reducers';

const persistConfig = {
	key: 'root',
	storage,
	blacklist: ['nav']
};


const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWare = [
	thunk,
	process.env.NODE_ENV !== 'production' && logger,
].filter(Boolean);

export default () => {
	let store = createStore(persistedReducer, applyMiddleware(...middleWare));
	let persistor = persistStore(store);
	return { store, persistor }
}

