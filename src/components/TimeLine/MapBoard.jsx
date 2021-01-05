import React, { useEffect, useState, useRef } from 'react';

import ImgComponent from '../common/ImgComponent';
import ChampPortrait from '../MatchList/Champ/ChampPortrait';

import './MapBoard.scss';
export default function MapBoard({
  mapId,
  moveFrame,
  participantChamps,
  curTime,
  eventLogs,
}) {
  const ref = useRef(null);
  const [positions, setPositions] = useState(Array(10).fill({ x: 0, y: 0 }));
  const [ratio, setRatio] = useState(1);
  useEffect(() => {
    ref.current && setRatio(ref.current.offsetWidth / 15000);
  }, [ref.current]);
  useEffect(() => {
    let curkey = 0;
    for (const key in moveFrame) {
      if (key > curTime) break;
      curkey = key;
    }
    setPositions((oldVal) =>
      moveFrame[curkey].map((val, idx) => (val ? val : oldVal[idx])),
    );
  }, [curTime]);
  if (!participantChamps || !mapId) return <div>loading</div>;
  return (
    <article className="map-board" ref={ref}>
      <ImgComponent
        src={`http://ddragon.leagueoflegends.com/cdn/6.8.1/img/map/map${mapId}.png`}
        alt={'map' + mapId}
        className="mini-map"
      />
      {Object.keys(participantChamps).map((key, index) => (
        <ChampPortrait
          championId={participantChamps[key]}
          className="map-champ-portrait"
          key={key}
          left={800 - positions[index].x * ratio}
          top={positions[index].y * ratio}
          borderColor={index < 5 ? '#3388ff' : '#ff88aa'}
        />
      ))}
    </article>
  );
}
