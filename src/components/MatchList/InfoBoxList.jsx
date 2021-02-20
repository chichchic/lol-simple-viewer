import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import InfoBox from './InfoBox';
import Loading from 'components/common/ComponentLoading.jsx';

import { getmatchList, getMatchDto } from 'fixture/getInfoFuncs.js';

const gettingListNum = 5;

export default function InfoBoxList({ account, showMore }) {
  const apiKey = useSelector(({ apiKey: { key } }) => {
    return key;
  });
  const [matchesArr, setMatchesArr] = useState([]);
  const [canGetMoreData, setCanGetMoreData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [beginIndex, setBeginIndex] = useState(0);
  //TODO: totalgame

  useEffect(() => {
    if (account) {
      addMatchList();
    }
    return () => {
      setMatchesArr([]);
      setBeginIndex(0);
    };
  }, [account]);
  async function addMatchList() {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const matchListData = await getmatchList(
        beginIndex,
        account,
        gettingListNum,
        apiKey,
      );
      const { matches, endIndex, totalGames } = matchListData;
      if (endIndex === totalGames) {
        setCanGetMoreData(false);
      } else {
        const promises = matches.map(({ gameId }) => {
          return getMatchDto(gameId, apiKey);
        });
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
