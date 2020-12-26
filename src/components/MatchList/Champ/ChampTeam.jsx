import React from 'react';
import PropTypes from 'prop-types';

import ChampPortrait from './ChampPortrait';

import './ChampTeam.scss';

export default function ChampTeam({ teamInfo }) {
  return (
    <article className="champ-team">
      {teamInfo.map(({ championId, summonerName }, index) => (
        <div key={index} className="content">
          <ChampPortrait championId={championId} />
          <span className="summoner-name">{summonerName}</span>
        </div>
      ))}
    </article>
  );
}

ChampTeam.propTypes = {
  teamInfo: PropTypes.array.isRequired,
};
