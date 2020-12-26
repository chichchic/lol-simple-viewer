import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import InfoBoxList from '../../components/MatchList/InfoBoxList';
import TextLink from '../../components/common/TextLink';
import SearchBar from '../../components/common/SearchBar';
import Profile from '../../components/MatchList/Profile';
import Rank from '../../components/MatchList/Rank';

import './MatchList.scss';

import { getJson } from '../../store/action/json';

const matchlistUrl = '/lol/match/v4/matchlists/by-account/';
const gettingListNum = 5;

async function getsummonerInfo(name) {
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

async function getLeagueInfo(id) {
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

export default function MatchList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { name } = useParams();

  function searchsummoner(inputVal) {
    //reset init data
    history.push('/match-list/' + inputVal);
  }

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
      await dispatch(getJson());
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
  }, [dispatch, name]);

  useEffect(() => {
    async function getmatchList(gameListIdx) {
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
      mergeGameIdList(matches);
    }
    if (account) getmatchList(gameListIdx);
  }, [gameListIdx, account]);

  return (
    <section className="match-list">
      <div className="top-nav">
        <TextLink label="LoLSimpleViewer" url={`/`} fontSize="2rem" />
        <SearchBar onClick={searchsummoner} />
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
