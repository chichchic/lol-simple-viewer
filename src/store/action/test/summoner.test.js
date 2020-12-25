import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { setsummonerInfo, getsummonerInfo } from '../summoner';
import summonerInfo from '../../../fixture/summonerInfo';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('summoner action', () => {
  beforeEach(function () {
    const mockSuccessResoponse = summonerInfo;
    const mockJsonPromise = Promise.resolve(mockSuccessResoponse);
    const mockFetchPromise = Promise.resolve({ json: () => mockJsonPromise });
    jest.spyOn(global, 'fetch').mockImplementation(() => {
      return mockFetchPromise;
    });
  });
  afterEach(function () {
    global.fetch.mockClear();
  });
  it('getSummonoInfo', async () => {
    const store = mockStore({});
    await store.dispatch(getsummonerInfo('name'));
    const actions = store.getActions();
    expect(actions[0]).toEqual(setsummonerInfo(summonerInfo));
  });
});
