function wait(time) {
  alert(
    `if it has too many requests in a short time, it will wait 2 min to request.`,
  );
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

async function requestWithRiotToken(url, isRetry = false) {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Riot-Token': process.env.REACT_APP_LOL_API,
    },
  });
  if (res.status === 429) {
    await wait(2 * 60 * 1000);
    return requestWithRiotToken(url, true);
  }
  if (!res.ok) throw new Error(res.status);

  return res.json();
}

export async function getLeagueInfo(id) {
  const url = `/lol/league/v4/entries/by-summoner/${id}`;
  const res = await requestWithRiotToken(url);
  return res;
}

export async function getsummonerInfo(name) {
  const url = `/lol/summoner/v4/summoners/by-name/${name}`;
  const res = await requestWithRiotToken(url);
  return res;
}

export async function getTimeLine(matchId) {
  const url = `/lol/match/v4/timelines/by-match/${matchId}`;
  const res = await requestWithRiotToken(url);
  return res;
}

export async function getMatchDto(matchId) {
  const url = `/lol/match/v4/matches/${matchId}`;
  const res = await requestWithRiotToken(url);
  return res;
}

export async function getmatchList(beginIndex, accountId, gettingListNum) {
  const endIndex = beginIndex + gettingListNum;
  let url = `/lol/match/v4/matchlists/by-account/${accountId}?beginIndex=${beginIndex}&endIndex=${endIndex}`;
  const res = await requestWithRiotToken(url);
  return res;
}
