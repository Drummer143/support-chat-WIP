import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './reducers/index';
import rootSaga from './sagas/index';

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

let store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));

export let persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export default store;
