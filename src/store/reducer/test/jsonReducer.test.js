import reducer from '../json';

import { setJson, getJson } from '../../action/json';

import jsonTypes from '../../../fixture/jsonType';

describe('json reducer', () => {
  it('setSummonorInfo', () => {
    const initJson = {};
    jsonTypes.forEach((val) => {
      initJson[val] = false;
    });
    const state = reducer(initJson, setJson(jsonTypes));
    jsonTypes.forEach((val) => {
      expect(state[val]).toEqual(val);
    });
  });
});
