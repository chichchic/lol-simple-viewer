const serverPort = 3000;

function requestWithRiotToken(url, token, isRetry = false) {
  const reg = /^[A-Za-z0-9-+]{42}$/;
  if (!reg.test(token)) {
    throw new Error(403);
  }
  const fullUrl = `https://localhost:${serverPort}/${url}&token=${token}`;
  return fetch(fullUrl)
    .then((res) => res.json())
    .then(
      //HACK: async await 구문으로 변경할것. res.json()이 제대로 동작하지 않는 오류로 인해 promise 구문을 사용함.
      (res) =>
        new Promise(function (resolve, reject) {
          const { status } = JSON.parse(res);
          if (!status) {
            resolve(res);
          } else if (!isRetry && status.status_code === 429) {
            alert(
              `it had too many requests in a short time. we need 2 min for the request.`,
            );
            setTimeout(() => {
              resolve(requestWithRiotToken(url, token, true));
            }, 2 * 60 * 1000);
          } else if (status.status_code >= 400) {
            reject(status.status_code);
          } else {
            resolve(res);
          }
        }),
    )
    .catch((err) => {
      if (err === 429) {
      } else {
        throw err;
      }
    });
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
