import summonerInfo from '../../fixture/summonerInfo';

export default function reducer(state = summonerInfo, action) {
  const { type, payload } = action;
  if (type === 'setsummonerInfo') {
    return {
      ...state,
      ...payload,
    };
  }

  return state;
}
