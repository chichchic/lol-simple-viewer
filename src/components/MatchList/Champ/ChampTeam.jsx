import React from 'react';
import PropTypes from 'prop-types';

import ChampPortrait from './ChampPortrait';

export default function ChampTeam({ teamInfo }) {
  return teamInfo.map(({ championId, summonerName }, index) => (
    <div key={index}>
      <ChampPortrait championId={championId} />
      <span>{summonerName}</span>
    </div>
  ));
}

ChampTeam.propTypes = {
  teamInfo: PropTypes.array.isRequired,
};
