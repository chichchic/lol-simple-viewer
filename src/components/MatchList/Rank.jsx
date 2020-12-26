import React from 'react';
import PropTypes from 'prop-types';

import ImgComponent from '../common/ImgComponent';

import './Rank.scss';

const emblemUrl = '../img/emblems/Emblem_';

export default function Rank({ leagueInfo }) {
  return (
    <div className="rank">
      {leagueInfo.map(
        ({ tier, queueType, rank, leaguePoints, wins, losses }, index) => {
          return (
            <article key={index} className="box">
              <ImgComponent
                src={emblemUrl + tier + '.png'}
                alt={tier}
                className="rank-emblem"
              />
              <div className="info">
                <div className="queue-type">{queueType}</div>
                <div className="tier">Tier:&nbsp;{tier + rank}</div>
                <div className="league-points">
                  League Points:&nbsp;{leaguePoints}
                </div>
                <div className="score">
                  <div className="wins">WIN:&nbsp;{wins}</div>
                  <span className="division">&nbsp;|&nbsp;</span>
                  <div className="losses">LOSE:&nbsp;{losses}</div>
                </div>
              </div>
            </article>
          );
        },
      )}
    </div>
  );
}

Rank.propTypes = {
  leagueInfo: PropTypes.array.isRequired,
};
