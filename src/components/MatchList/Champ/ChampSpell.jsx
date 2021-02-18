import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import ImgComponent from '../../common/ImgComponent';

function findSrc(spellJson, spellNum) {
  for (const key in spellJson.data) {
    if (Object.hasOwnProperty.call(spellJson.data, key)) {
      if (spellJson.data[key].key === String(spellNum)) {
        return {
          src: `http://ddragon.leagueoflegends.com/cdn/11.4.1/img/spell/${spellJson.data[key].id}.png`,
          alt: spellJson.data[key].name,
        };
      }
    }
  }
  return false;
}

export default function ChampSpell({ spellNum }) {
  const spellJson = useSelector((state) => state.json.summoner);
  const [imgSrc, setImgSrc] = useState(false);
  useEffect(() => {
    setImgSrc(findSrc(spellJson, spellNum));
  }, [spellNum, spellJson]);
  if (!imgSrc) {
    //TODO: 나중에 적절한 이미지로 대체 할 것.
    return <div>Err</div>;
  }
  return <ImgComponent {...imgSrc} className="spell" />;
}

ChampSpell.propTypes = {
  spellNum: PropTypes.number.isRequired,
};
