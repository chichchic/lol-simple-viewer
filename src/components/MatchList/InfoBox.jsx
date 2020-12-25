import React from 'react';
import { useParams } from 'react-router-dom';

import ChampInfo from './Champ/ChampInfo';
import ChampTeam from './Champ/ChampTeam';
import ItemBox from './Item/ItemBox';

import './infoBox.scss';

const initChmpInfo = {
  firstSpellNum: 0,
  secondSpellNum: 0,
  firstRuneNum: 0,
  secondRuneNum: 0,
  championId: 0,
  champLevel: 0,
  kills: 0,
  deaths: 0,
  assists: 0,
  goldEarned: 0,
  totalKill: 0,
};
function makeTeam(identities, participants, name) {
  let isBlueTeamWin = false;
  let amIWin = false;
  const blueTeam = [];
  const redTeam = [];
  const itemBox = [];
  let totalKill = 0;
  let champInfo = { ...initChmpInfo };
  participants.forEach(
    ({
      championId,
      participantId,
      teamId,
      spell1Id,
      spell2Id,
      stats: {
        win,
        item0,
        item1,
        item2,
        item3,
        item4,
        item5,
        item6,
        deaths,
        kills,
        assists,
        goldEarned,
        perk0,
        perkSubStyle,
        champLevel,
      },
    }) => {
      const summonerName = identities[participantId - 1].player.summonerName;
      totalKill += kills;
      if (summonerName === name) {
        amIWin = win;
        itemBox.push(item0, item1, item2, item3, item4, item5, item6);
        champInfo = {
          ...champInfo,
          championId,
          deaths,
          kills,
          assists,
          goldEarned,
          champLevel,
          firstSpellNum: spell1Id,
          secondSpellNum: spell2Id,
          firstRuneNum: perk0,
          secondRuneNum: perkSubStyle,
        };
      }
      if (teamId === 100) {
        isBlueTeamWin = win;
        blueTeam.push({
          championId,
          summonerName,
        });
      } else {
        redTeam.push({
          championId,
          summonerName,
        });
      }
    },
  );
  champInfo.totalKill = totalKill;
  return [blueTeam, redTeam, itemBox, champInfo, amIWin, isBlueTeamWin];
}

export default function InfoBox({
  gameId,
  mapId,
  participantIdentities,
  participants,
}) {
  const { name } = useParams();
  const [
    blueTeam,
    redTeam,
    itemBox,
    champInfo,
    amIWin,
    isBlueTeamWin,
  ] = makeTeam(participantIdentities, participants, name);
  return (
    <article className="info-box">
      <ChampInfo {...champInfo} />
      <ItemBox itemArray={itemBox} />
      <ChampTeam teamInfo={blueTeam} />
      <ChampTeam teamInfo={redTeam} />
    </article>
  );
}
