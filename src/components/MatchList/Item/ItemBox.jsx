import React from 'react';
import PropTypes from 'prop-types';

import Item from './Item';

const trinketList = [2052, 3340, 3363, 3364];

function makeItemBox(itemArray) {
  const componentArr = [];
  let hasTrinket = false;
  for (let i = 0; i < 7; i++) {
    if (i >= itemArray.length) {
      componentArr.push(-1);
      continue;
    }
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

export default function ItemBox({ itemArray }) {
  return (
    <article className="item-box">
      {makeItemBox(itemArray).map((itemNum, idx) => (
        <Item key={idx} itemNum={itemNum} />
      ))}
    </article>
  );
}

ItemBox.propTypes = {
  itemArray: PropTypes.array.isRequired,
};
