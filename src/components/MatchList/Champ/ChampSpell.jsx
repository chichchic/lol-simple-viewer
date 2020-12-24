import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import ImgComponent from '../../common/ImgComponent';

function makeSpellProps(spellJson, spellNum) {
  for (const key in spellJson.data) {
    if (Object.hasOwnProperty.call(spellJson.data, key)) {
      if (spellJson.data[key].key === String(spellNum)) {
        return {
          src: `http://ddragon.leagueoflegends.com/cdn/10.25.1/img/spell/${spellJson.data[key].id}.png`,
          alt: spellJson.data[key].name,
        };
      }
    }
  }
}

export default function ChampSpell({ firstSpellNum, secondSpellNum }) {
  const spellJson = useSelector((state) => state.json.summoner);
  if (spellJson) {
    return (
      <div>
        <ImgComponent
          {...makeSpellProps(spellJson, firstSpellNum)}
          className="first-spell"
        />
        <ImgComponent
          {...makeSpellProps(spellJson, secondSpellNum)}
          className="first-spell"
        />
      </div>
    );
  }
  return <div>Loading</div>;
}

ChampSpell.propTypes = {
  firstSpellNum: PropTypes.number.isRequired,
  secondSpellNum: PropTypes.number.isRequired,
};
