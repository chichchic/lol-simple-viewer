import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import ImgComponent from 'components/common/ImgComponent';

function findSrc(runeJson, runeNum) {
  for (const { id, icon, name, slots } of runeJson) {
    if (id === runeNum) {
      return {
        src: `http://localhost:3000/img/${icon}`,
        alt: name,
      };
    }
    if (slots) {
      for (const { runes } of slots) {
        const inner = findSrc(runes, runeNum);
        if (inner) return inner;
      }
    }
  }
  return false;
}

export default function ChampRune({ runeNum }) {
  const runeJson = useSelector((state) => state.json.runesReforged);
  const [imgSrc, setImgSrc] = useState(false);
  useEffect(() => {
    setImgSrc(findSrc(runeJson, runeNum));
  }, [runeJson, runeNum]);
  if (!imgSrc) {
    //TODO: 나중에 적절한 이미지로 대체 할 것.
    return <div>Err</div>;
  }
  return <ImgComponent {...imgSrc} className="rune" />;
}

ChampRune.propTypes = {
  runeNum: PropTypes.number.isRequired,
};
