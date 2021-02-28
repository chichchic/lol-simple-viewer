const init = { key: '' };

export default function reducer(state = init, action) {
  const { type, payload } = action;
  if (type === 'setApiKey') {
    state.key = payload;
    return state;
  }
  return state;
}
