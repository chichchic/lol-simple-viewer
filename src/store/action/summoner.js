export function setsummonerInfo(summonerInfo) {
  return {
    type: 'setsummonerInfo',
    payload: summonerInfo,
  };
}

export function getsummonerInfo(name) {
  return async (dispatch) => {
    const result = await fetch(`/lol/summoner/v4/summoners/by-name/${name}`, {
      method: 'GET',
      headers: {
        'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Riot-Token': process.env.REACT_APP_LOL_API,
      },
    });
    const summonerInfo = await result.json();
    dispatch(setsummonerInfo(summonerInfo));
  };
}
