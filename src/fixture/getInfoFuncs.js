const serverPort = 3000;

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

async function requestWithRiotToken(url, token, isRetry = false) {
  try {
    const reg = /^[A-Za-z0-9-+]{42}$/;
    if (!reg.test(token)) {
      throw 403;
    }
    url = `http://localhost:${serverPort}/${url}&token=${token}`;
    const res = await fetch(url);

    if (res.status === 429) {
      await wait(2 * 60 * 1000);
      return requestWithRiotToken(url, token, true);
    }
    if (!res.ok) {
      throw res.status;
    }
    return res.json();
  } catch (err) {
    throw err;
  }
}

export async function getLeagueInfo(id, token) {
  try {
    const url = `rank?id=${id}`;
    const res = await requestWithRiotToken(url, token);
    return res;
  } catch (err) {
    throw err;
  }
}

export async function getsummonerInfo(name, token) {
  try {
    const url = `summoner?name=${name}`;
    const res = await requestWithRiotToken(url, token);
    return res;
  } catch (err) {
    throw err;
  }
}

export async function getTimeLine(matchId, token) {
  try {
    const url = `timeLines?matchId=${matchId}`;
    const res = await requestWithRiotToken(url, token);
    return res;
  } catch (err) {
    throw err;
  }
}

export async function getMatchDto(matchId, token) {
  try {
    const url = `matchInfo?matchId=${matchId}`;
    const res = await requestWithRiotToken(url, token);
    return res;
  } catch (err) {
    throw err;
  }
}

export async function getmatchList(
  beginIndex,
  accountId,
  gettingListNum,
  token,
) {
  try {
    let url = `matchList?accountId=${accountId}&start=${beginIndex}&gameCount=${gettingListNum}`;
    const res = await requestWithRiotToken(url, token);
    return res;
  } catch (err) {
    throw err;
  }
}
