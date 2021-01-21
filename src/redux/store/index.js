import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import StateReducer from '../reducers/stateReducer';
import LoginReducer from '../reducers/loginReducer';
import CommonLoaderReducer from '../reducers/loaderReducer';
import SignupReducer from '../reducers/signupReducer';

const persistConfig = {
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: ['LoginReducer'],
};

const rootReducer = combineReducers({
  StateReducer,
  LoginReducer,
  CommonLoaderReducer,
  SignupReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(persistedReducer, applyMiddleware(thunk));

let persistor = persistStore(store);

export {store, persistor};
