import React, { useState, useEffect } from 'react';

import ItemBox from '../../components/MatchList/Item/ItemBox';

import { trinketList } from '../../fixture/fixedData';

//BUG: 예전 시즌 아이템들을 받아오지 못하는 오류가 발생함.
export default function Map({ itemLogs, participantChamps, curTime }) {
  const [itemStatus, setItemStatus] = useState();
  useEffect(() => {
    (function checkItemLog() {
      if (!itemLogs) return;
      const initItemStatus = Array.from(Array(10), () => Array(7).fill(0));
      for (const key in itemLogs) {
        if (key > curTime) break;
        itemLogs[key].forEach((item, index) => {
          setItemStatus((oldVal) => {
            if (item && item.hasOwnProperty('ITEM_DESTROYED')) {
              const itemNum = item.ITEM_DESTROYED;
              const vacancyIndex = initItemStatus[index].findIndex(
                (val) => val === itemNum,
              );
              vacancyIndex < 0 || (initItemStatus[index][vacancyIndex] = 0);
            }
            if (item && item.hasOwnProperty('ITEM_SOLD')) {
              const itemNum = item.ITEM_SOLD;
              const vacancyIndex = initItemStatus[index].findIndex(
                (val) => val === itemNum,
              );
              vacancyIndex < 0 || (initItemStatus[index][vacancyIndex] = 0);
            }
            if (item && item.hasOwnProperty('ITEM_PURCHASED')) {
              const itemNum = item.ITEM_PURCHASED;
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
            return initItemStatus;
          });
        });
      }
    })();
  }, [curTime, itemLogs]);
  if (!itemStatus) return <div>Loading</div>;
  return (
    <div>
      {itemStatus.map((item, index) => (
        <ItemBox itemArray={item} key={index} />
      ))}
    </div>
  );
}
