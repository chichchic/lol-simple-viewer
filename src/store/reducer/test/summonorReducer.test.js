import reducer from '../summonor';

import { setSummonorInfo, getSummonorInfo } from '../../action/summonor';

describe('summonor reducer', () => {
  it('setSummonorInfo', () => {
    const testState = {
      test: 'test',
    };
    const state = reducer({}, setSummonorInfo(testState));
    expect(state.test).toEqual('test');
  });
});
