import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import InfoBoxList from '../../components/MatchList/InfoBoxList';
import TextLink from '../../components/common/TextLink';
import SummonerSearchBar from '../../components/common/SummonerSearchBar';
import Profile from '../../components/MatchList/Profile';
import Rank from '../../components/MatchList/Rank';

import './MatchList.scss';

import {
  getsummonerInfo,
  getLeagueInfo,
  getmatchList,
} from '../../fixture/getInfoFuncs.js';

export default function MatchList() {
  const history = useHistory();
  const { name } = useParams();
  const gettingListNum = 5;

  const [gameIdList, setgameIdList] = useState([]);
  const [gameListIdx, setgameListIdx] = useState(0);
  const [account, setAccount] = useState(null);
  const [iconId, setIconId] = useState(null);
  const [level, setLevel] = useState(null);
  const [leagueInfo, setLeagueInfo] = useState(null);
  function mergeGameIdList(newArr) {
    setgameIdList((oldArr) => [...oldArr, ...newArr]);
  }
  useEffect(() => {
    async function getJsonDatas() {
      if (!name) {
        alert("Can't search empty string name");
        return;
      }
      const {
        id,
        profileIconId,
        accountId,
        summonerLevel,
      } = await getsummonerInfo(name);
      const league = await getLeagueInfo(id);
      setAccount(accountId);
      setIconId(profileIconId);
      setLevel(summonerLevel);
      setLeagueInfo(league);
    }
    getJsonDatas();
    return () => {
      setAccount(null);
      setIconId(null);
      setLevel(null);
      setLeagueInfo(null);
      setgameListIdx(0);
      setgameIdList([]);
    };
  }, [name]);

  useEffect(() => {
    if (account) {
      (async () => {
        // match list info에서 제공해주는 모든 데이터를 받도록 해야함
        const { matches } = await getmatchList(
          gameListIdx,
          account,
          gettingListNum,
        );
        mergeGameIdList(matches);
      })();
    }
  }, [gameListIdx, account]);

  return (
    <section className="match-list">
      <div className="top-nav">
        <TextLink label="LoLSimpleViewer" url="/" fontSize="2rem" />
        <SummonerSearchBar
          callBack={(name) => history.push('/match-list/' + name)}
        />
      </div>
      <div className="content">
        <div className="left-content">
          {iconId && level && (
            <Profile profileIconId={iconId} summonerLevel={level} />
          )}
          {leagueInfo && <Rank leagueInfo={leagueInfo} />}
        </div>

        <div className="right-content">
          <div className="info-list">
            <InfoBoxList gameIdList={gameIdList} />
            <button
              className="show-more-btn"
              onClick={() =>
                setgameListIdx((oldVal) => oldVal + gettingListNum)
              }
            >
              SHOW MORE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
