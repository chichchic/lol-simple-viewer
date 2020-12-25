import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import ImgComponent from '../../common/ImgComponent';

const itemImgUrl = 'http://ddragon.leagueoflegends.com/cdn/10.25.1/img/item/';

export default function Item({ itemNum, className }) {
  const itemJson = useSelector((state) => state.json.item.data);
  if (!itemJson) return <div>Loading</div>;
  if (itemNum == 0) {
    return (
      <div className={className}>
        <ImgComponent src="../img/blank.png" alt="empty" className="empty" />
      </div>
    );
  }
  const itemInfo = itemJson[itemNum];
  return (
    <div className={className}>
      <ImgComponent
        src={itemImgUrl + itemInfo.image.full}
        alt={itemInfo.name}
        className="champPortrait"
      />
    </div>
  );
}

Item.propTypes = {
  itemNum: PropTypes.number.isRequired,
};
