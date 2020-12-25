import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import ImgComponent from '../../common/ImgComponent';

const champImgUrl =
  'http://ddragon.leagueoflegends.com/cdn/10.25.1/img/champion/';

export default function ChampPortrait({ championId, champLevel }) {
  const champRune = useSelector((state) => state.json.champion.data);
  const champData = {};
  if (!champRune) return <div>Loading</div>;
  for (const key in champRune) {
    if (Object.hasOwnProperty.call(champRune, key)) {
      champData[champRune[key].key] = {
        src: champImgUrl + champRune[key].image.full,
        alt: champRune[key].id,
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
