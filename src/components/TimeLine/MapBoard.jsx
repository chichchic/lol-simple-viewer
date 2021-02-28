import React, { useEffect, useState, useRef } from 'react';

import ImgComponent from '../common/ImgComponent';
import ChampPortrait from '../MatchList/Champ/ChampPortrait';
import { BuildingPosition11, BuildingPosition12 } from 'fixture/fixedData.js';
import './MapBoard.scss';

function drawBuildings(ratio, buildingPosition, { current }) {
  const { blue, red } = buildingPosition;
  const arr = [];
  Object.keys(blue).forEach((key) => {
    arr.push(
      ...drawBuilding(blue[key], ratio, 'BLUE' + key, current.blue[key]),
    );
  });
  Object.keys(red).forEach((key) => {
    arr.push(...drawBuilding(red[key], ratio, 'RED' + key, current.red[key]));
  });
  return arr;
}

function drawBuilding(building, ratio, lane, status) {
  return Object.keys(building).map((key) => {
    if (!status[key]) return;
    const { x, y } = building[key];
    return (
      <div
        key={lane + key}
        className={`building ${lane} ${key}`}
        style={{ right: (x - 193) * ratio, top: (y - 10) * ratio }}
      ></div>
    );
  });
}
export default function MapBoard({
  mapId,
  moveFrame,
  participantChamps,
  curTime,
  accDestBuild,
}) {
  const ref = useRef();
  const [positions, setPositions] = useState(Array(10).fill({ x: 0, y: 0 }));
  //NOTE: deep copy instance
  const buildings = useRef(
    JSON.parse(
      JSON.stringify(
        mapId === 11 ? BuildingPosition11.frame : BuildingPosition12.frame,
      ),
    ),
  );
  const [ratio, setRatio] = useState(1);
  useEffect(() => {
    setRatio(ref.current.offsetWidth / 14865);
  });
  useEffect(() => {
    let curkey = 0;
    for (const key in moveFrame) {
      if (key > curTime) break;
      curkey = key;
    }
    setPositions((oldVal) =>
      moveFrame[curkey].map((val, idx) => (val ? val : oldVal[idx])),
    );
    let buildKey = 0;
    for (const key in accDestBuild) {
      if (key > curTime) break;
      buildKey = key;
    }
    accDestBuild[buildKey].forEach((val) => {
      const { teamId, laneType, towerType } = val;
      const oldVal = buildings.current;
      const team = teamId === 100 ? 'blue' : 'red';
      if (towerType === 'NEXUS_TURRET') {
        for (const key in oldVal[team][towerType]) {
          if (!oldVal[team][towerType][key]) {
            oldVal[team][towerType][key] = false;
            break;
          }
        }
      } else {
        oldVal[team][laneType][towerType] = false;
      }
    });

    return () => {
      //NOTE: deep copy instance
      buildings.current = JSON.parse(
        JSON.stringify(
          mapId === 11 ? BuildingPosition11.frame : BuildingPosition12.frame,
        ),
      );
    };
  }, [curTime]);

  if (!participantChamps || !mapId) return <div>loading</div>;
  return (
    <article className="map-board" ref={ref}>
      <ImgComponent
        src={`https://ddragon.leagueoflegends.com/cdn/6.8.1/img/map/map${mapId}.png`}
        alt={'map' + mapId}
        className="mini-map"
      />
      {drawBuildings(
        ratio,
        mapId === 11 ? BuildingPosition11 : BuildingPosition12,
        buildings,
      )}
      {Object.keys(participantChamps).map((key, index) => (
        <ChampPortrait
          championId={participantChamps[key]}
          className="map-champ-portrait"
          key={key}
          right={(positions[index].y - 349) * ratio}
          top={(positions[index].x + 197) * ratio}
          borderColor={index < 5 ? '#3388ff' : '#ff88aa'}
        />
      ))}
    </article>
  );
}
