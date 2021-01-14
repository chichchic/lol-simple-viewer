import { combineReducers } from 'redux';
import json from './json';
import apiKey from './apiKey';

const rootReducer = combineReducers({
  apiKey,
  json,
});

export default rootReducer;
