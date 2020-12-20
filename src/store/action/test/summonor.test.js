import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { setSummonorInfo, getSummonorInfo } from '../summonor';
import summonorInfo from '../../../fixture/summonorInfo';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('summonor action', () => {
  beforeEach(function () {
    const mockSuccessResoponse = summonorInfo;
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
    await store.dispatch(getSummonorInfo('name'));
    const actions = store.getActions();
    expect(actions[0]).toEqual(setSummonorInfo(summonorInfo));
  });
});
