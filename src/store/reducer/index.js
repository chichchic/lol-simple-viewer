import { combineReducers } from 'redux';
import summonor from './summonor';
import json from './json';

const rootReducer = combineReducers({
  summonor,
  json,
});

export default rootReducer;
