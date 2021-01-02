import React, { useEffect, useState } from 'react';

import InfoBox from './InfoBox';

import { getMatchDto } from '../../fixture/getInfoFuncs.js';

export default function InfoBoxList({ gameIdList }) {
  const [matchesArr, setMatchesArr] = useState([]);
  useEffect(() => {
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
