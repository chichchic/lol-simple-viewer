import React from 'react';
import PropTypes from 'prop-types';

import ImgComponent from '../../common/ImgComponent';

const RuneName = {
  7200: 'Domination',
  7201: 'Presision',
  7202: 'Sorcery',
  7203: 'Whimsy',
  7204: 'Resolve',
};

//TODO: runeName에 없는 숫자가 들어올 경우 예외를 발생시켜야함

export default function ChampRune({ firstRuneNum, secondRuneNum }) {
  function makeRuneProps(runeNum) {
    return {
      src: `./img/runes/${runeNum}_${RuneName[runeNum]}.png`,
      alt: RuneName[runeNum],
    };
  }
  return (
    <div className="rune-box">
      <ImgComponent {...makeRuneProps(firstRuneNum)} className="first-rune" />
      <ImgComponent {...makeRuneProps(secondRuneNum)} className="second-rune" />
    </div>
  );
}

ChampRune.propTypes = {
  firstRuneNum: PropTypes.number.isRequired,
  secondRuneNum: PropTypes.number.isRequired,
};
