import React from 'react';
import PropTypes from 'prop-types';

import ImgComponent from '../common/ImgComponent';

import './Rank.scss';

const emblemUrl = '../img/emblems/Emblem_';

function fakeRank() {
  return (
    <div className="box">
      <div className="fake_img"></div>
      <div className="info">
        <div className="fake_title"></div>
        <div className="fake_description"></div>
      </div>
    </div>
  );
}

export default function Rank({ leagueInfo }) {
  return <div className="rank">{fakeRank()}</div>;
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
                <h2 className="queue-type">{queueType}</h2>
                <p className="tier">Tier:&nbsp;{tier + rank}</p>
                <p className="league-points">
                  League Points:&nbsp;{leaguePoints}
                </p>
                <p className="score">
                  <strong className="wins">WIN:&nbsp;{wins}</strong>
                  <span className="division">&nbsp;|&nbsp;</span>
                  <strong className="losses">LOSE:&nbsp;{losses}</strong>
                </p>
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
