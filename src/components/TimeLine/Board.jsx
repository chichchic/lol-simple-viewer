import React, { useRef, useEffect } from 'react';

import BoardLine from './BoardLine';

import './Board.scss';

export default function Board({ eventLogs, participantChamps, curTime }) {
  const end = useRef();
  useEffect(() => {
    end.current.scrollIntoView();
  });
  if (!eventLogs) return <div>loading</div>;
  function showBoadLine() {
    const eventLine = [];
    for (const key in eventLogs) {
      if (key > curTime) break;
      eventLine.push(
        <BoardLine
          participantChamps={participantChamps}
          event={eventLogs[key]}
          timestamp={key}
          key={key}
        />,
      );
    }
    return eventLine;
  }
  return (
    <article className="board">
      {showBoadLine()}
      <div ref={end}></div>
    </article>
  );
}
