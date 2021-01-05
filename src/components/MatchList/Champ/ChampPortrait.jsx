import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import ImgComponent from '../../common/ImgComponent';

import './ChampPortrait.scss';

const champImgUrl =
  'http://ddragon.leagueoflegends.com/cdn/10.25.1/img/champion/';

export default function ChampPortrait({
  championId,
  champLevel,
  className,
  left = 0,
  top = 0,
  borderColor,
}) {
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
    <article
      className={className || 'champ-portriat-component'}
      style={{ left, top }}
    >
      {champLevel && <div className="champ-level">{champLevel}</div>}
      <ImgComponent
        {...champData[championId]}
        className="champ-portrait"
        borderColor={borderColor}
      />
    </article>
  );
}

ChampPortrait.propTypes = {
  championId: PropTypes.number.isRequired,
};
