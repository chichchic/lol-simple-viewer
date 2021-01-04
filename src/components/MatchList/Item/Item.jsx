import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import ImgComponent from '../../common/ImgComponent';

const itemImgUrl = 'http://ddragon.leagueoflegends.com/cdn/10.25.1/img/item/';

export default function Item({ itemNum, className }) {
  const itemJson = useSelector((state) => state.json.item.data);
  if (!itemJson) return <div>Loading</div>;
  //BUG: 오른 강화아이템의 경우 data-dragon에서 이미지를 제공해주고 있지 않음. 이에 따라 버그가 발생됨
  //관련 링크: https://github.com/RiotGames/developer-relations/issues/419
  if (itemNum <= 0 || itemNum >= 7000) {
    return (
      <ImgComponent src="../img/blank.png" alt="empty" className={className} />
    );
  }
  const itemInfo = itemJson[itemNum];
  try {
    return (
      <ImgComponent
        src={itemImgUrl + itemInfo.image.full}
        alt={itemInfo.name}
        className={className}
      />
    );
  } catch (error) {
    return <div>Err</div>;
  }
}

Item.propTypes = {
  itemNum: PropTypes.number.isRequired,
};
