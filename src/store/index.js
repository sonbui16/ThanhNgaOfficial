import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logger} from 'redux-logger';

import reducers from './reducers';
import rootSaga from './sagas';
import app from './reducers/app';
import auth from './reducers/auth';
import {requests} from './reducers/common';

import {loadingSlice} from '../features/loading';
import {videoSlice} from '../features/video/';


const createSagaMiddleware = require('redux-saga').default;
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
// if (__DEV__) middleware.push(logger);
if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}
const enhancer = [applyMiddleware(...middleware)];
window.devToolsExtension && enhancer.push(window.devToolsExtension());

const persistConfig = {
  storage: AsyncStorage,
  key: 'Edubit',
  blacklist:[""],
};

const rootReducer = combineReducers({
  [loadingSlice.reducerPath]: loadingSlice.reducer,
  [videoSlice.reducerPath]: videoSlice.reducer,
  app,
  auth,
  requests,
});

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      //  thunk: false,
    }).concat(sagaMiddleware, logger),
  //  devTools: process.env.NODE_ENV === 'development',
});
sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);

export default store;
