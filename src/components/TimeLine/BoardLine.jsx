import React from 'react';

import ChampPortrait from '../MatchList/Champ/ChampPortrait';

import './BoardLine.scss';

function minsec(timestamp) {
  const min = Math.floor(timestamp / 1000 / 60);
  const sec = Math.floor(timestamp / 1000 - min * 60);
  return `${min}분 ${sec}초`;
}

function champImage(championId) {
  if (championId === 0) {
    return (
      <div className="board-portrait">
        <img
          src="http://ddragon.leagueoflegends.com/cdn/10.25.1/img/profileicon/13.png"
          alt="minion"
        />
      </div>
    );
  } else {
    return (
      <ChampPortrait
        championId={championId}
        className="board-portrait"
        borderColor={championId < 6 ? '#3388ff' : '#ff88aa'}
      />
    );
  }
}

function eliteMonsterImage(championId, monsterType, monsterSubType) {
  if (monsterType === 'DRAGON')
    return (
      <div className="board-portrait">
        <img
          src={'../../img/dragon/' + monsterSubType + '.png'}
          alt="minion"
          style={{ borderColor: championId < 6 ? '#3388ff' : '#ff88aa' }}
        />
      </div>
    );
  else if (monsterType === 'RIFTHERALD') {
    return (
      <div className="board-portrait">
        <img
          src="../../img/RIFTHERALD.jpg"
          alt="minion"
          style={{ borderColor: championId < 6 ? '#3388ff' : '#ff88aa' }}
        />
      </div>
    );
  } else if (monsterType === 'BARON_NASHOR') {
    return (
      <div className="board-portrait">
        <img
          src="http://ddragon.leagueoflegends.com/cdn/10.25.1/img/profileicon/839.png"
          alt="minion"
          style={{ borderColor: championId < 6 ? '#3388ff' : '#ff88aa' }}
        />
      </div>
    );
  }
}

function turretImgage(teamId, buildingType) {
  if (buildingType === 'TOWER_BUILDING') {
    return (
      <div className="board-portrait">
        <img
          src="../../img/Turret.jpg"
          alt="Turret"
          style={{ borderColor: teamId === 100 ? '#3388ff' : '#ff88aa' }}
        />
      </div>
    );
  } else if (buildingType === 'INHIBITOR_BUILDING') {
    return (
      <div className="board-portrait">
        <img
          src="../../img/Inhibitor.png"
          alt="Inhibitor"
          style={{ borderColor: teamId === 100 ? '#3388ff' : '#ff88aa' }}
        />
      </div>
    );
  }
}

export default function BoardLine({ event, participantChamps, timestamp }) {
  return Object.keys(event).map((key, index) => {
    if (key === 'CHAMPION_KILL') {
      const { killerId, victimId } = event[key];
      return (
        <div key={key} className="board-line">
          <div className="timestamp">{minsec(timestamp)}</div>
          {champImage(killerId)}
          <div className="killed-text">Killed</div>
          {champImage(victimId)}
        </div>
      );
    } else if (key === 'ELITE_MONSTER_KILL') {
      const { killerId, monsterType, monsterSubType } = event[key];
      return (
        <div key={key} className="board-line">
          <div className="timestamp">{minsec(timestamp)}</div>
          {eliteMonsterImage(killerId, monsterType, monsterSubType)}
          <div className="killed-text">Killed</div>
        </div>
      );
    } else if (key === 'BUILDING_KILL') {
      const { killerId, buildingType, laneType, teamId, towerType } = event[
        key
      ];
      return (
        <div key={key} className="board-line">
          <div className="timestamp">{minsec(timestamp)}</div>
          {turretImgage(teamId, buildingType)}
          <div className="killed-text">Destroyed</div>
        </div>
      );
    }
  });
}