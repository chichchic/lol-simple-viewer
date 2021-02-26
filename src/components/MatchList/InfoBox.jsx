import React, { useState, useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import GameInfo from './GameInfo';
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
  killRatio: 0,
};
function makeTeam(identities, participants, name) {
  let amIWin = false;
  const blueTeam = [];
  const redTeam = [];
  const itemBox = [];
  let blueKill = 0;
  let redKill = 0;
  let champInfo = {};
  let myTeam;

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
      if (summonerName.toLowerCase() === name.toLowerCase()) {
        amIWin = win;
        myTeam = teamId;
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
        blueKill += kills;
        blueTeam.push({
          championId,
          summonerName,
        });
      } else {
        redKill += kills;
        redTeam.push({
          championId,
          summonerName,
        });
      }
    },
  );
  const totalKill = myTeam === 100 ? blueKill : redKill;
  const killRatio =
    ((((champInfo.kills + champInfo.assists) / totalKill) * 10000) >> 0) / 100;
  return [blueTeam, redTeam, itemBox, { ...champInfo, killRatio }, amIWin];
}

export default function InfoBox({
  gameId,
  gameCreation,
  queueId,
  gameDuration,
  participantIdentities,
  participants,
}) {
  const history = useHistory();
  const { name } = useParams();

  const [blueTeam, setBlueTeam] = useState([]);
  const [redTeam, setRedTeam] = useState([]);
  const [itemBox, setItemBox] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [champInfo, setChampInfo] = useState(initChmpInfo);
  const [gameStatus, setGameStatus] = useState(null);

  const backgroundColors = useRef({
    Remake: {
      backgroundColor: '#888888',
    },
    Victory: {
      backgroundColor: '#3388ff',
    },
    Defeat: {
      backgroundColor: '#ff88aa',
    },
  });

  useEffect(() => {
    const [blue, red, items, champ, win] = makeTeam(
      participantIdentities,
      participants,
      name,
    );
    setBlueTeam(blue);
    setRedTeam(red);
    setItemBox(items);
    setChampInfo((old) => ({ ...old, ...champ }));
    setGameStatus(() => {
      if (gameDuration < 300) {
        return 'Remake';
      }
      if (win) {
        return 'Victory';
      }
      return 'Defeat';
    });
  }, [participantIdentities, participants, name]);
  return (
    <article className="info-box" style={backgroundColors.current[gameStatus]}>
      <GameInfo
        queueId={queueId}
        gameCreation={gameCreation}
        gameDuration={gameDuration}
        status={gameStatus}
      />
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
