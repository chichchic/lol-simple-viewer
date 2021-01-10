import React, { useEffect, useState } from 'react';

import InfoBox from './InfoBox';
import Loading from '../common/ComponentLoading';

import { getmatchList, getMatchDto } from '../../fixture/getInfoFuncs.js';

const gettingListNum = 5;

export default function InfoBoxList({ account, showMore }) {
  const [matchesArr, setMatchesArr] = useState([]);
  const [canGetMoreData, setCanGetMoreData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [beginIndex, setBeginIndex] = useState(0);
  //TODO: totalgame

  useEffect(() => {
    if (account) {
      setMatchesArr([]);
      setBeginIndex(0);
      addMatchList();
    }
  }, [account]);
  async function addMatchList() {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const matchListData = await getmatchList(
        beginIndex,
        account,
        gettingListNum,
      );
      const { matches, startIndex, endIndex, totalGames } = matchListData;
      if (endIndex === totalGames) {
        setCanGetMoreData(false);
      } else {
        const promises = matches.map(({ gameId }) => getMatchDto(gameId));
        const matchInfos = await Promise.all(promises);
        setMatchesArr((oldInfo) => [...oldInfo, ...matchInfos]);
        setBeginIndex(endIndex);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <article className="info-box-list">
      {matchesArr.map((gameInfo, index) => (
        <InfoBox {...gameInfo} key={index} />
      ))}
      {isLoading && <Loading />}
      {showMoreButton(canGetMoreData, addMatchList)}
    </article>
  );
}

function showMoreButton(canGetMoreData, onClick) {
  if (canGetMoreData) {
    return (
      <button className="show-more-btn" onClick={onClick}>
        SHOW MORE
      </button>
    );
  } else {
    return <p className="show-more-btn">END DATA</p>;
  }
}
