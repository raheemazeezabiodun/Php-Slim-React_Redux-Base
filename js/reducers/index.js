import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import createAppReducer from './create';
import readAppReducer from './read';

export default combineReducers({
    createAppReducer,
    readAppReducer,
    routing: routerReducer
});