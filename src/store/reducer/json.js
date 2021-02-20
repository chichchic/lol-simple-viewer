import dragonJsonTypes from 'fixture/dragonJsonTypes';

const initJson = {};
dragonJsonTypes.forEach((val) => {
  initJson[val] = false;
});

export default function reducer(state = initJson, action) {
  const { type, payload } = action;
  if (type === 'setJson') {
    dragonJsonTypes.forEach((val, index) => {
      state[val] = payload[index];
    });
    return state;
  }
  return state;
}
