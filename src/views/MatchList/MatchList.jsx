import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import InfoBoxList from 'components/MatchList/InfoBoxList';
import TextLink from 'components/common/TextLink';
import SummonerSearchBar from 'components/common/SummonerSearchBar';
import Profile from 'components/MatchList/Profile';
import Rank from 'components/MatchList/Rank';

import './MatchList.scss';

import { getsummonerInfo, getLeagueInfo } from 'fixture/getInfoFuncs.js';

export default function MatchList() {
  const { name } = useParams();

  const [account, setAccount] = useState(null);
  const [iconId, setIconId] = useState(1);
  const [level, setLevel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [soloLeagueInfo, setSoloLeagueInfo] = useState({
    queueType: 'Ranked Solo',
  });
  const [flexLeagueInfo, setFlexLeagueInfo] = useState({
    queueType: 'Ranked Flex',
  });
  const apiKey = useSelector(({ apiKey: { key } }) => {
    return key;
  });
  useEffect(() => {
    async function getJsonDatas() {
      //TODO: 예외처리 넣어야함
      try {
        setLoading(true);
        const summonerJson = await getsummonerInfo(name, apiKey);
        const summonerInfo = JSON.parse(summonerJson);
        const { id, profileIconId, accountId, summonerLevel } = summonerInfo;
        const leagueJosn = await getLeagueInfo(id, apiKey);
        const league = JSON.parse(leagueJosn);
        setAccount(accountId);
        setIconId(profileIconId);
        setLevel(summonerLevel);
        league.forEach((leagueInfo) => {
          if (leagueInfo.queueType === 'RANKED_SOLO_5x5') {
            setSoloLeagueInfo(
              Object.assign(leagueInfo, {
                queueType: 'Ranked Solo',
              }),
            );
          } else if (leagueInfo.queueType === 'RANKED_FLEX_SR') {
            setFlexLeagueInfo(
              Object.assign(leagueInfo, {
                queueType: 'Ranked Flex',
              }),
            );
          }
        });
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
    getJsonDatas();
  }, [name, apiKey]);
  return (
    <section className="match-list">
      <div className="top-nav">
        <TextLink label="LoLSimpleViewer" url="/" fontSize="2rem" />
        <SummonerSearchBar />
      </div>
      <div className="content">
        <div className="left-content">
          {
            <Profile
              loading={loading}
              profileIconId={iconId}
              summonerLevel={level}
            />
          }
          {<Rank loading={loading} {...soloLeagueInfo} />}
          {<Rank loading={loading} {...flexLeagueInfo} />}
        </div>

        <div className="right-content">
          <InfoBoxList account={account} />
        </div>
      </div>
    </section>
  );
}
