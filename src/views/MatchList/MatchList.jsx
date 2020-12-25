import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import InfoBoxList from '../../components/MatchList/InfoBoxList';

import './MatchList.scss';

import { getJson } from '../../store/action/json';
const matchlistUrl = '/lol/match/v4/matchlists/by-account/';

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

export default function MatchList() {
  const { name } = useParams();
  const dispatch = useDispatch();

  const [gameIdList, setgameIdList] = useState([]);
  const [gameListIdx, setgameListIdx] = useState(0);
  const [accountId, setAccountId] = useState(null);
  function mergeGameIdList(newArr) {
    setgameIdList((oldArr) => [...oldArr, ...newArr]);
  }
  useEffect(() => {
    async function getJsonDatas() {
      if (name === '') {
        alert("Can't search empty string name");
        return;
      }
      const { accountId } = await getsummonerInfo(name);
      setAccountId(accountId);
      await dispatch(getJson());
    }
    getJsonDatas();
  }, [dispatch, name]);

  useEffect(() => {
    async function getmatchList(gameListIdx) {
      let url =
        matchlistUrl +
        accountId +
        `?beginIndex=${gameListIdx}&endIndex=${gameListIdx + 5}`;
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
    if (accountId) getmatchList(gameListIdx);
  }, [gameListIdx, accountId]);

  return (
    <section>
      <InfoBoxList gameIdList={gameIdList} />
      <button onClick={() => setgameListIdx((oldVal) => oldVal + 5)}>
        bububuton
      </button>
    </section>
  );
}
