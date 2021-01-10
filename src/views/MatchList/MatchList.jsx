import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import InfoBoxList from '../../components/MatchList/InfoBoxList';
import TextLink from '../../components/common/TextLink';
import SummonerSearchBar from '../../components/common/SummonerSearchBar';
import Profile from '../../components/MatchList/Profile';
import Rank from '../../components/MatchList/Rank';
import Loading from '../common/Loading';

import './MatchList.scss';

import { getsummonerInfo, getLeagueInfo } from '../../fixture/getInfoFuncs.js';

export default function MatchList() {
  const history = useHistory();
  const { name } = useParams();

  const [account, setAccount] = useState(null);
  const [iconId, setIconId] = useState(null);
  const [level, setLevel] = useState(null);
  const [leagueInfo, setLeagueInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getJsonDatas() {
      //TODO: 예외처리 넣어야함
      try {
        setLoading(true);
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
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
    getJsonDatas();
    return () => {
      setAccount(null);
      setIconId(null);
      setLevel(null);
      setLeagueInfo(null);
    };
  }, [name]);
  if (loading) {
    return <Loading />;
  }
  return (
    <section className="match-list">
      <div className="top-nav">
        <TextLink label="LoLSimpleViewer" url="/" fontSize="2rem" />
        <SummonerSearchBar />
      </div>
      <div className="content">
        <div className="left-content">
          {iconId && level && (
            <Profile profileIconId={iconId} summonerLevel={level} />
          )}
          {leagueInfo && <Rank leagueInfo={leagueInfo} />}
        </div>

        <div className="right-content">
          <InfoBoxList account={account} />
        </div>
      </div>
    </section>
  );
}
