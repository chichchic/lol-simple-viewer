import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';

import InfoBox from './InfoBox';
import Loading from 'components/common/ComponentLoading.jsx';

import { getmatchList, getMatchDto } from 'fixture/getInfoFuncs.js';

const gettingListNum = 5;

function ShowMoreButton(canGetMoreData, onClick) {
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

export default function InfoBoxList({ account }) {
  const apiKey = useSelector(({ apiKey: { key } }) => {
    return key;
  });
  const [matchesArr, setMatchesArr] = useState([]);
  const [canGetMoreData, setCanGetMoreData] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const beginIndex = useRef(0);

  const addMatchList = useCallback(async () => {
    try {
      const { current } = beginIndex;
      setIsLoading(true);
      const matchListDataJSON = await getmatchList(
        current,
        account,
        gettingListNum,
        apiKey,
      );
      const matchListData = JSON.parse(matchListDataJSON);
      const { matches, endIndex, totalGames } = matchListData;
      if (endIndex === totalGames) {
        setCanGetMoreData(false);
      } else {
        const promises = matches.map(({ gameId }) => {
          return getMatchDto(gameId, apiKey);
        });
        const matchInfos = await Promise.all(promises);
        setMatchesArr((oldInfo) => [
          ...oldInfo,
          ...matchInfos.map((jsonData) => {
            return JSON.parse(jsonData);
          }),
        ]);
        beginIndex.current = endIndex;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [apiKey, account]);
  //TODO: totalgame

  useEffect(() => {
    if (account !== null) {
      addMatchList();
    }
    return () => {
      setMatchesArr([]);
      beginIndex.current = 0;
    };
  }, [account, addMatchList]);

  return (
    <article className="info-box-list">
      {matchesArr.map((gameInfo, index) => (
        <InfoBox {...gameInfo} key={index} />
      ))}
      {isLoading && <Loading />}
      {ShowMoreButton(canGetMoreData, addMatchList)}
    </article>
  );
}
