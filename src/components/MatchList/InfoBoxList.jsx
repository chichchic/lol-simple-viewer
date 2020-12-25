import React, { useEffect, useState } from 'react';

import InfoBox from './InfoBox';

const matchesUrl = '/lol/match/v4/matches/';

export default function InfoBoxList({ gameIdList }) {
  const [matchesArr, setMatchesArr] = useState([]);
  useEffect(() => {
    async function getMatchDto(matchId) {
      const req = await fetch(matchesUrl + matchId, {
        headers: {
          'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
          'X-Riot-Token': process.env.REACT_APP_LOL_API,
        },
      });
      const result = await req.json();
      return result;
    }
    const promises = gameIdList.map(({ gameId }) => getMatchDto(gameId));
    Promise.all(promises).then((res) => {
      setMatchesArr(res);
    });
  }, [gameIdList]);
  return (
    <article>
      {matchesArr.map((gameInfo, index) => (
        <InfoBox {...gameInfo} key={index} />
      ))}
    </article>
  );
}
