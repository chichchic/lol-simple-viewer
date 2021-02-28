import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import ImgComponent from 'components/common/ImgComponent';

const itemImgUrl = 'https://ddragon.leagueoflegends.com/cdn/11.4.1/img/item/';
const blankSrc = {
  src: 'http://localhost:3000/img/blank.png',
  alt: 'empty',
};
function makeImgAttribute(itemJson, itemNum) {
  const itemInfo = itemJson[itemNum];
  if (itemInfo) {
    return {
      src: itemImgUrl + itemInfo.image.full,
      alt: itemInfo.name,
    };
  }
  return blankSrc;
}

export default function Item({ itemNum, className }) {
  const itemJson = useSelector((state) => state.json.item.data);
  const [imgSrc, setImgSrc] = useState(blankSrc);
  useEffect(() => {
    setImgSrc(makeImgAttribute(itemJson, itemNum));
  }, [itemJson, itemNum]);
  //BUG: 오른 강화아이템의 경우 data-dragon에서 이미지를 제공해주고 있지 않음. 이에 따라 버그가 발생됨
  //관련 링크: https://github.com/RiotGames/developer-relations/issues/419
  return <ImgComponent {...imgSrc} className={className} />;
}

Item.propTypes = {
  itemNum: PropTypes.number.isRequired,
};
