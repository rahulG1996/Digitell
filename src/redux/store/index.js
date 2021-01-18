import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import StateReducer from '../reducers/stateReducer';

const rootReducer = combineReducers({
  StateReducer,
});

let store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
