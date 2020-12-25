import { combineReducers } from 'redux';
import summoner from './summoner';
import json from './json';

const rootReducer = combineReducers({
  summoner,
  json,
});

export default rootReducer;
