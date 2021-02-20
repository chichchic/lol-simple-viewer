import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Item from './Item';

import './ItemBox.scss';
import { trinketList } from 'fixture/fixedData';

function makeItemBox(itemArray) {
  const componentArr = [];
  let hasTrinket = false;
  for (let i = 0; i < 7; i++) {
    if (trinketList.includes(itemArray[i])) {
      hasTrinket = itemArray[i];
    } else {
      componentArr.push(itemArray[i]);
    }
  }
  if (hasTrinket) {
    componentArr.push(hasTrinket);
  }
  return componentArr;
}

export default function ItemBox({ itemArray, grid }) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(makeItemBox(itemArray));
  }, [itemArray]);
  return (
    <article className={grid ? 'item-box' : 'horizontal'}>
      {items.map((itemNum, idx) => (
        <Item
          key={idx}
          itemNum={itemNum}
          className={idx === itemArray.length - 1 ? 'trinket' : 'item'}
        />
      ))}
    </article>
  );
}

ItemBox.propTypes = {
  itemArray: PropTypes.array.isRequired,
};
