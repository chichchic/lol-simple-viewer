export function setSummonorInfo(summonorInfo) {
  return {
    type: 'setSummonorInfo',
    payload: summonorInfo,
  };
}

export function getSummonorInfo(name) {
  return async (dispatch) => {
    const result = await fetch(`/summoner/v4/summoners/by-name/${name}`, {
      method: 'GET',
      headers: {
        'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Riot-Token': process.env.REACT_APP_LOL_API,
      },
    });
    const summonorInfo = await result.json();
    dispatch(setSummonorInfo(summonorInfo));
  };
}
