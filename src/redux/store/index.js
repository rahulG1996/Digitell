import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({});

let store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
