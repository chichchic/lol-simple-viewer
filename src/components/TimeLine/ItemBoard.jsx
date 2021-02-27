import React, { useState, useEffect, useRef } from 'react';

import ItemBox from 'components/MatchList/Item/ItemBox';
import ChampPortrait from 'components/MatchList/Champ/ChampPortrait';

import { trinketList } from 'fixture/fixedData';

import './ItemBoard.scss';

const soleItemList = [2003, 2010, 2055];

//BUG: 예전 시즌 아이템들을 받아오지 못하는 오류가 발생함.

function ItemRow(item, index, participantChamps) {
  return (
    <article
      className="item-row"
      style={{
        backgroundColor: index < 5 ? '#3388ff' : '#ff88aa',
      }}
      key={index}
    >
      <ChampPortrait
        championId={participantChamps[index + 1]}
        className="champ-portrait"
      />
      <ItemBox itemArray={item} />
    </article>
  );
}

function TeamBoard(itemStatus, teamColor, participantChamps) {
  const startIdx = teamColor === 'blue' ? 0 : 5;
  const rows = [];
  for (let i = 0; i < 5; i++) {
    const index = startIdx + i;
    rows.push(ItemRow(itemStatus[index], index, participantChamps));
  }
  return (
    <div
      className="teamBoard"
      style={{
        backgroundColor: teamColor === 'blue' ? '#3388ff' : '#ff88aa',
      }}
    >
      {rows}
    </div>
  );
}

export default function ItemBoard({ itemLogs, participantChamps, curTime }) {
  const [itemStatus, setItemStatus] = useState(
    Array.from(Array(10), () => Array(7).fill(0)),
  );
  const soleItems = useRef(Array.from(Array(10), () => Array(3).fill(0)));
  useEffect(() => {
    (function checkItemLog() {
      if (!itemLogs) return;
      const initItemStatus = Array.from(Array(10), () => Array(7).fill(0));
      const initSoleItems = Array.from(Array(10), () => Array(3).fill(0));
      for (const key in itemLogs) {
        if (key > curTime) break;
        itemLogs[key].forEach((item, index) => {
          setItemStatus(() => {
            if (item && item.hasOwnProperty('ITEM_DESTROYED')) {
              const itemNum = item.ITEM_DESTROYED;
              const soleIdx = soleItemList.findIndex((val) => val === itemNum);
              if (soleIdx >= 0) {
                initSoleItems[index][soleIdx] =
                  initSoleItems[index][soleIdx] > 0
                    ? initSoleItems[index][soleIdx] - 1
                    : 0;
                if (initSoleItems[index][soleIdx] > 0) {
                  soleItems.current = initSoleItems;
                  return initItemStatus;
                }
              }
              const vacancyIndex = initItemStatus[index].findIndex(
                (val) => val === itemNum,
              );
              vacancyIndex < 0 || (initItemStatus[index][vacancyIndex] = 0);
            }
            if (item && item.hasOwnProperty('ITEM_SOLD')) {
              const itemNum = item.ITEM_SOLD;
              const soleIdx = soleItemList.findIndex((val) => val === itemNum);
              if (soleIdx >= 0) {
                initSoleItems[index][soleIdx] =
                  initSoleItems[index][soleIdx] > 0
                    ? initSoleItems[index][soleIdx] - 1
                    : 0;
                if (initSoleItems[index][soleIdx] > 0) {
                  soleItems.current = initSoleItems;
                  return initItemStatus;
                }
              }
              const vacancyIndex = initItemStatus[index].findIndex(
                (val) => val === itemNum,
              );
              vacancyIndex < 0 || (initItemStatus[index][vacancyIndex] = 0);
            }
            if (item && item.hasOwnProperty('ITEM_PURCHASED')) {
              const itemNum = item.ITEM_PURCHASED;
              const soleIdx = soleItemList.findIndex((val) => val === itemNum);

              if (soleIdx >= 0) {
                initSoleItems[index][soleIdx] =
                  initSoleItems[index][soleIdx] + 1;
                if (initSoleItems[index][soleIdx] > 1) {
                  soleItems.current = initSoleItems;
                  return initItemStatus;
                }
              }
              if (trinketList.findIndex((val) => val === itemNum) !== -1) {
                initItemStatus[index][6] = itemNum;
              } else {
                const vacancyIndex = initItemStatus[index].findIndex(
                  (val) => val === 0,
                );
                if (vacancyIndex >= 0 && vacancyIndex < 6) {
                  initItemStatus[index][vacancyIndex] = itemNum;
                }
              }
            }
            if (item && item.hasOwnProperty('FINAL')) {
              initItemStatus[index] = item.FINAL;
            }
            soleItems.current = initSoleItems;
            return initItemStatus;
          });
        });
      }
    })();
  }, [curTime, itemLogs]);
  return (
    <section className="ItemBoard">
      {TeamBoard(itemStatus, 'blue', participantChamps)},
      {TeamBoard(itemStatus, 'red', participantChamps)}
    </section>
  );
}
