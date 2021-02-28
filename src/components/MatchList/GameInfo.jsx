import React, { useRef } from 'react';

import queueType from 'assets/json/queueType.json';
import './GameInfo.scss';

export default function GameInfo({
  queueId,
  gameCreation,
  gameDuration,
  status,
}) {
  const colors = useRef({
    Remake: {
      color: '#000000',
    },
    Victory: {
      color: '#0008ff',
    },
    Defeat: {
      color: '#f20045',
    },
  });

  return (
    <article className="game-info">
      <p className="game-type">
        {(function findGameType(queueId) {
          const output = [...queueType].find(
            (type) => type.queueId === queueId,
          );
          if (output === undefined) {
            return '';
          }
          return output.description.slice(0, output.length - 6);
        })()}
      </p>
      <p className="term">
        {(function calcTerm() {
          const term = Date.now() - gameCreation;
          const sec = parseInt(term / 1000);
          if (sec < 60) {
            return `${sec}초 전`;
          }
          const min = parseInt(term / 1000 / 60);
          if (min < 60) {
            return `${min}분 전`;
          }
          const hour = parseInt(term / 1000 / 60 / 60);
          if (hour < 24) {
            return `${hour}시간 전`;
          }
          const day = parseInt(term / 1000 / 60 / 60 / 24);
          return `${day}일 전`;
          //TODO: 승리,패배,재시작 분리 작업 후 글자 표시 및 배경색 적용. 리그 종류 표기하기
        })()}
      </p>
      <hr
        style={{
          border: 'thin solid #333',
          width: '50%',
          margin: '.5rem auto',
        }}
      />
      <p className="status" style={colors.current[status]}>
        {status}
      </p>
      <p className="duration">
        {(function calcDuration() {
          return `${parseInt(gameDuration / 60)}m ${parseInt(
            gameDuration % 60,
          )}`;
        })()}
      </p>
    </article>
  );
}
