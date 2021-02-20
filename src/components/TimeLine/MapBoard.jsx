import React, { useEffect, useState, useRef } from 'react';

import ImgComponent from '../common/ImgComponent';
import ChampPortrait from '../MatchList/Champ/ChampPortrait';
import { BuildingPosition11, BuildingPosition12 } from 'fixture/fixedData.js';
import './MapBoard.scss';

function drawBuildings(ratio, buildingPosition) {
  const { blue, red } = buildingPosition;
  const arr = [];
  Object.keys(blue).forEach((key) => {
    arr.push(...drawBuilding(blue[key], ratio, 'BLUE' + key));
  });
  Object.keys(red).forEach((key) => {
    arr.push(...drawBuilding(red[key], ratio, 'RED' + key));
  });
  return arr;
}

function drawBuilding(building, ratio, lane) {
  return Object.keys(building).map((key) => {
    const { x, y } = building[key];
    return (
      <div
        key={lane + key}
        className={`building ${lane} ${key}`}
        style={{ left: 800 - x * ratio, top: y * ratio }}
      ></div>
    );
  });
}
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
      {drawBuildings(
        ratio,
        mapId === 11 ? BuildingPosition11 : BuildingPosition12,
      )}
      {Object.keys(participantChamps).map((key, index) => (
        <ChampPortrait
          championId={participantChamps[key]}
          className="map-champ-portrait"
          key={key}
          left={800 - positions[index].y * ratio}
          top={positions[index].x * ratio}
          borderColor={index < 5 ? '#3388ff' : '#ff88aa'}
        />
      ))}
    </article>
  );
}
