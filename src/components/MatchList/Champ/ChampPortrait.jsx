import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import ImgComponent from 'components/common/ImgComponent';

import './ChampPortrait.scss';

const champImgUrl =
  'http://ddragon.leagueoflegends.com/cdn/11.4.1/img/champion/';

function findSource(champJson, championId) {
  for (const key in champJson) {
    if (champJson[key].hasOwnProperty('key')) {
      if (Number(champJson[key].key) === championId)
        return {
          src: champImgUrl + champJson[key].image.full,
          alt: champJson[key].id,
        };
    }
  }
  return false;
}

export default function ChampPortrait({
  championId,
  champLevel,
  className,
  right = 0,
  top = 0,
  borderColor,
}) {
  const champJson = useSelector((state) => state.json.champion.data);
  const [imgSrc, setImgSrc] = useState(false);
  useEffect(() => {
    setImgSrc(findSource(champJson, championId));
  }, [champJson, championId]);
  if (!imgSrc) {
    //TODO: 나중에 적절한 이미지로 대체 할 것.
    return <div>Err</div>;
  }
  return (
    <article
      className={className || 'champ-portriat-component'}
      style={{ right, top }}
    >
      {champLevel && <div className="champ-level">{champLevel}</div>}
      <ImgComponent
        {...imgSrc}
        className="champ-portrait"
        borderColor={borderColor}
      />
    </article>
  );
}

ChampPortrait.propTypes = {
  championId: PropTypes.number.isRequired,
};
