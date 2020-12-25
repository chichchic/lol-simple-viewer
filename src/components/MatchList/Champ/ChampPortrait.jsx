import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import ImgComponent from '../../common/ImgComponent';

const champImgUrl =
  'http://ddragon.leagueoflegends.com/cdn/10.25.1/img/champion/';

export default function ChampPortrait({ championId, champLevel }) {
  const champJson = useSelector((state) => state.json.champion.data);
  const champData = {};
  if (!champJson) return <div>Loading</div>;
  for (const key in champJson) {
    if (Object.hasOwnProperty.call(champJson, key)) {
      champData[champJson[key].key] = {
        src: champImgUrl + champJson[key].image.full,
        alt: champJson[key].id,
      };
    }
  }
  return (
    <div>
      <ImgComponent {...champData[championId]} className="champPortrait" />
      {champLevel && <span>{champLevel}</span>}
    </div>
  );
}

ChampPortrait.propTypes = {
  championId: PropTypes.number.isRequired,
};
