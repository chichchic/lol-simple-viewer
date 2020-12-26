import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import ImgComponent from '../../common/ImgComponent';

import './ChampRune.scss';

export default function ChampRune({ firstRuneNum, secondRuneNum }) {
  const runeJson = useSelector((state) => state.json.runesReforged);
  if (!runeJson) return <div>loading</div>;
  const runeData = {};
  runeJson.forEach((pVal) => {
    runeData[pVal.id] = {
      src: `../img/${pVal.icon}`,
      alt: pVal.name,
    };
    pVal.slots.forEach(({ runes }) => {
      runes.forEach(({ id, icon, name }) => {
        runeData[id] = {
          src: `../img/${icon}`,
          alt: name,
        };
      });
    });
  });

  function makeRuneProps(runeNum) {
    return runeData[runeNum];
  }
  return (
    <article className="champ-rune">
      <div className="main-rune-bg">
        <ImgComponent {...makeRuneProps(firstRuneNum)} className="first-rune" />
      </div>
      <ImgComponent {...makeRuneProps(secondRuneNum)} className="second-rune" />
    </article>
  );
}

ChampRune.propTypes = {
  firstRuneNum: PropTypes.number.isRequired,
  secondRuneNum: PropTypes.number.isRequired,
};
