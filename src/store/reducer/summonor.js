import summonorInfo from '../../fixture/summonorInfo';

export default function reducer(state = summonorInfo, action) {
  const { type, payload } = action;
  if (type === 'setSummonorInfo') {
    return {
      ...state,
      ...payload,
    };
  }

  return state;
}
