import React from 'react';
import { useParams, useHistory } from 'react-router-dom';

import ChampInfo from './Champ/ChampInfo';
import ChampTeam from './Champ/ChampTeam';
import ItemBox from './Item/ItemBox';

import './infoBox.scss';
import { AiFillPlayCircle } from 'react-icons/ai';

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
  return [blueTeam, redTeam, itemBox, champInfo, amIWin];
}

export default function InfoBox({
  gameId,
  mapId,
  participantIdentities,
  participants,
}) {
  const history = useHistory();
  const { name } = useParams();
  const [blueTeam, redTeam, itemBox, champInfo, amIWin] = makeTeam(
    participantIdentities,
    participants,
    name,
  );
  return (
    <article className="info-box" style={amIWin ? isWin : isLose}>
      <ChampInfo {...champInfo} />
      <ItemBox itemArray={itemBox} grid={true} />
      <ChampTeam teamInfo={blueTeam} />
      <ChampTeam teamInfo={redTeam} />
      <button
        className="play-btn"
        onClick={() => history.push('/time-line/' + gameId)}
      >
        <AiFillPlayCircle />
      </button>
    </article>
  );
}

const isWin = {
  backgroundColor: '#3388ff',
};
const isLose = {
  backgroundColor: '#ff88aa',
};
