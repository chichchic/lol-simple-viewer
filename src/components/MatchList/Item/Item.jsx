import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import ImgComponent from '../../common/ImgComponent';

const itemImgUrl = 'http://ddragon.leagueoflegends.com/cdn/10.25.1/img/item/';

export default function Item({ itemNum, className }) {
  const itemJson = useSelector((state) => state.json.item.data);
  if (!itemJson) return <div>Loading</div>;
  if (Number(itemNum) === 0) {
    return (
      <ImgComponent src="../img/blank.png" alt="empty" className={className} />
    );
  }
  const itemInfo = itemJson[itemNum];
  return (
    <ImgComponent
      src={itemImgUrl + itemInfo.image.full}
      alt={itemInfo.name}
      className={className}
    />
  );
}

Item.propTypes = {
  itemNum: PropTypes.number.isRequired,
};
