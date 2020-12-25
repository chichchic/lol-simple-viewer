import reducer from '../summoner';

import { setsummonerInfo, getsummonerInfo } from '../../action/summoner';

describe('summoner reducer', () => {
  it('setsummonerInfo', () => {
    const testState = {
      test: 'test',
    };
    const state = reducer({}, setsummonerInfo(testState));
    expect(state.test).toEqual('test');
  });
});
