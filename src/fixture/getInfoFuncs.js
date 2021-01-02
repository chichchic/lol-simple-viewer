export async function getLeagueInfo(id) {
  const res = await fetch(`/lol/league/v4/entries/by-summoner/${id}`, {
    method: 'GET',
    headers: {
      'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Riot-Token': process.env.REACT_APP_LOL_API,
    },
  });
  const leagueInfo = await res.json();
  return leagueInfo;
}

export async function getsummonerInfo(name) {
  const res = await fetch(`/lol/summoner/v4/summoners/by-name/${name}`, {
    method: 'GET',
    headers: {
      'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Riot-Token': process.env.REACT_APP_LOL_API,
    },
  });
  const summonerInfo = await res.json();
  return summonerInfo;
}

export async function getTimeLine(matchId) {
  const res = await fetch(`/lol/match/v4/timelines/by-match/${matchId}`, {
    method: 'GET',
    headers: {
      'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Riot-Token': process.env.REACT_APP_LOL_API,
    },
  });
  const leagueInfo = await res.json();
  return leagueInfo;
}

export async function getMatchDto(matchId) {
  const matchesUrl = '/lol/match/v4/matches/';
  const req = await fetch(matchesUrl + matchId, {
    headers: {
      'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Riot-Token': process.env.REACT_APP_LOL_API,
    },
  });
  const result = await req.json();
  return result;
}

export async function getmatchList(gameListIdx, account, gettingListNum) {
  const matchlistUrl = '/lol/match/v4/matchlists/by-account/';
  let url =
    matchlistUrl +
    account +
    `?beginIndex=${gameListIdx}&endIndex=${gameListIdx + gettingListNum}`;
  const req = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Riot-Token': process.env.REACT_APP_LOL_API,
    },
  });
  const { matches } = await req.json();
  return matches;
}
