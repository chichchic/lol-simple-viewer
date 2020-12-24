import jsonTypes from '../../fixture/jsonType';

const initJson = {};
jsonTypes.forEach((val) => {
  initJson[val] = false;
});

export default function reducer(state = initJson, action) {
  const { type, payload } = action;
  if (type === 'setJson') {
    jsonTypes.forEach((val, index) => {
      state[val] = payload[index];
    });
    return state;
  }
  return state;
}
