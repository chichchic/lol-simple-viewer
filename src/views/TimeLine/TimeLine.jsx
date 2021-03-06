import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import ItemBoard from 'components/TimeLine/ItemBoard';
import MapBoard from 'components/TimeLine/MapBoard';
import Board from 'components/TimeLine/Board';
import PlayerController from 'components/TimeLine/PlayerController';
import Loading from '../common/Loading';

import { getTimeLine, getMatchDto } from 'fixture/getInfoFuncs.js';
import { AiOutlineArrowLeft } from 'react-icons/ai';

import './TimeLine.scss';

function calcRespawn(deathtimeStamp, level) {
  //NOTE: version2 에서 사용될 예정
  //ref: https://leagueoflegends.fandom.com/wiki/Death
  let BRW;
  if (level < 7) {
    BRW = level * 2 + 4;
  } else if (level > 7) {
    BRW = level * 2.5 + 7.5;
  } else {
    BRW = 21;
  }
  let increase = 0;
  if (deathtimeStamp > 15 * 60 * 1000) {
    increase +=
      (BRW / 100) * (Math.floor(deathtimeStamp / 60 / 1000) - 15) * 2 * 0.425;
  }
  if (deathtimeStamp > 30 * 60 * 1000) {
    increase +=
      (BRW / 100) * (Math.floor(deathtimeStamp / 60 / 1000) - 30) * 2 * 0.3;
  }
  if (deathtimeStamp > 45 * 60 * 1000) {
    increase +=
      (BRW / 100) * (Math.floor(deathtimeStamp / 60 / 1000) - 45) * 2 * 1.45;
  }
  BRW *= 1000;
  const maxout = BRW * 0.5;
  return deathtimeStamp + BRW + (maxout > increase ? increase : maxout);
}

//NOTE: This func is changing parameter's status
function makeLogTime(logs, timestamp) {
  if (logs.hasOwnProperty(timestamp)) return;
  const initArr = [];
  initArr.length = 10;
  initArr.fill(null);
  logs[timestamp] = initArr;
}

function addMoveLog(moveLogs, { timestamp, participantId }, position) {
  makeLogTime(moveLogs, timestamp);
  moveLogs[timestamp][participantId - 1] = position;
}

function addItemLog(itemLogs, { timestamp, participantId, type, itemId }) {
  makeLogTime(itemLogs, timestamp);
  if (!itemLogs[timestamp][participantId - 1]) {
    itemLogs[timestamp][participantId - 1] = {};
  }
  itemLogs[timestamp][participantId - 1][type] = itemId;
}

function addEventLog(
  eventLogs,
  {
    timestamp,
    type,
    killerId,
    victimId,
    monsterType,
    monsterSubType,
    buildingType,
    laneType,
    teamId,
    towerType,
  },
) {
  if (!eventLogs.hasOwnProperty(timestamp)) {
    eventLogs[timestamp] = {};
  }
  switch (type) {
    case 'CHAMPION_KILL':
      eventLogs[timestamp][type] = { killerId, victimId };
      break;
    case 'ELITE_MONSTER_KILL':
      eventLogs[timestamp][type] = { killerId, monsterType, monsterSubType };
      break;
    case 'BUILDING_KILL':
      eventLogs[timestamp][type] = {
        killerId,
        buildingType,
        laneType,
        teamId,
        towerType,
      };
      break;
    default:
  }
}

function extractEvents(
  events,
  moveLogs,
  itemLogs,
  eventLogs,
  dragonList,
  accDestroyedBuilding,
) {
  events.forEach((event) => {
    switch (event.type) {
      case 'CHAMPION_KILL':
        addMoveLog(
          moveLogs,
          { timestamp: event.timestamp, participantId: event.killerId },
          event.position,
        );
        addMoveLog(
          moveLogs,
          { timestamp: event.timestamp, participantId: event.victimId },
          moveLogs[0][event.victimId - 1],
        );
        //TODO: 회색 아이콘 만들고 부활시간 계산해서 돌아가도록 만들어줘야함 -> eventlog를 통해서 파악. 건물 엘리트 몬스터들도
        addEventLog(eventLogs, event);
        break;
      case 'BUILDING_KILL':
        addEventLog(eventLogs, event);
        addMoveLog(
          moveLogs,
          { timestamp: event.timestamp, participantId: event.killerId },
          event.position,
        );
        (function addAccDestroyedBuilding() {
          const { teamId, towerType, laneType, timestamp } = event;
          accDestroyedBuilding.last.push({ teamId, towerType, laneType });
          accDestroyedBuilding[timestamp] = [...accDestroyedBuilding.last];
        })();
        break;
      case 'ELITE_MONSTER_KILL':
        if (event.monsterType === 'DRAGON')
          dragonList.push(event.monsterSubType);
        addMoveLog(
          moveLogs,
          { timestamp: event.timestamp, participantId: event.killerId },
          event.position,
        );
        addEventLog(eventLogs, event);
        break;
      case 'ITEM_PURCHASED':
        addMoveLog(moveLogs, event, moveLogs[0][event.participantId - 1]);
        addItemLog(itemLogs, event);
        break;
      case 'ITEM_SOLD':
        addMoveLog(moveLogs, event, moveLogs[0][event.participantId - 1]);
        addItemLog(itemLogs, event);
        break;
      case 'ITEM_DESTROYED':
        addItemLog(itemLogs, event);
        break;
      default:
    }
  });
}

function makeLogs({ frames }, { gameDuration, participants }) {
  const endTime = (gameDuration + 1) * 1000;
  const participantChamps = {};
  const moveLogs = {};
  const itemLogs = {};
  const eventLogs = {};
  const accDestroyedBuilding = { last: [], 0: [] };
  const dragonList = [];
  frames.forEach(({ events, participantFrames, timestamp }) => {
    for (const key in participantFrames) {
      const { participantId, position } = participantFrames[key];
      addMoveLog(moveLogs, { timestamp, participantId }, position);
    }
    extractEvents(
      events,
      moveLogs,
      itemLogs,
      eventLogs,
      dragonList,
      accDestroyedBuilding,
    );
  });
  participants.forEach(
    ({
      participantId,
      championId,
      stats: { item0, item1, item2, item3, item4, item5, item6 },
    }) => {
      participantChamps[participantId] = championId;
      addItemLog(itemLogs, {
        timestamp: endTime,
        participantId,
        type: 'FINAL',
        itemId: [item0, item1, item2, item3, item4, item5, item6],
      });
    },
  );
  return [
    endTime,
    participantChamps,
    moveLogs,
    itemLogs,
    eventLogs,
    accDestroyedBuilding,
  ];
}

//TODO: 뒤로가기
//TODO: TimeLine Filter
export default function TimeLine() {
  const apiKey = useSelector(({ apiKey: { key } }) => {
    return key;
  });
  const history = useHistory();
  const { matchId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [endTime, setEndTime] = useState(false);
  const [moveLogs, setMoveLogs] = useState(false);
  const [itemLogs, setItemLogs] = useState(false);
  const [eventLogs, setEventLogs] = useState(false);
  const [participantChamps, setParticipantChamps] = useState(false);
  const [curTime, setCurTime] = useState(0);
  const [map, setMap] = useState();
  const accDestBuild = useRef();

  useEffect(() => {
    (async () => {
      const timeLineJSON = await getTimeLine(matchId, apiKey);
      const timeLine = JSON.parse(timeLineJSON);
      const matchDtoJSON = await getMatchDto(matchId, apiKey);
      const matchDto = JSON.parse(matchDtoJSON);
      const { mapId } = matchDto;
      setMap(mapId);
      const [end, champ, move, item, event, accDestroyedBuilding] = makeLogs(
        timeLine,
        matchDto,
      );
      accDestBuild.current = accDestroyedBuilding;
      setEndTime(end);
      setMoveLogs(move);
      setItemLogs(item);
      setEventLogs(event);
      setParticipantChamps(champ);
      setIsLoading(true);
    })();
  }, [matchId, apiKey]);
  if (!isLoading) {
    return <Loading />;
  }
  return (
    <section className="time-line">
      <button className="go-back" onClick={() => history.goBack()}>
        <AiOutlineArrowLeft />
      </button>
      <div className="left">
        <ItemBoard
          itemLogs={itemLogs}
          participantChamps={participantChamps}
          curTime={curTime}
        />
      </div>
      <div className="center">
        <MapBoard
          mapId={map}
          moveFrame={moveLogs}
          participantChamps={participantChamps}
          curTime={curTime}
          accDestBuild={accDestBuild.current}
        />
        <PlayerController
          totalTime={endTime}
          curTime={curTime}
          setCurTime={setCurTime}
        />
      </div>
      <div className="right">
        <Board
          eventLogs={eventLogs}
          participantChamps={participantChamps}
          curTime={curTime}
        />
      </div>
    </section>
  );
}
