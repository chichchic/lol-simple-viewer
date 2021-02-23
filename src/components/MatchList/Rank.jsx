import React from 'react';
import PropTypes from 'prop-types';

import ImgComponent from '../common/ImgComponent';

import './Rank.scss';

const emblemUrl = '../img/emblems/Emblem_';

function FakeRank() {
  return (
    <div className="rank">
      <div className="box">
        <div className="fake_img"></div>
        <div className="info">
          <div className="fake_title"></div>
          <div className="fake_description"></div>
        </div>
      </div>
    </div>
  );
}

function RankBox(
  tier = 'UNRANK',
  queueType,
  rank = '',
  leaguePoints = 0,
  wins = 0,
  losses = 0,
) {
  return (
    <div className="rank">
      <article className="box">
        <ImgComponent
          src={emblemUrl + tier + '.png'}
          alt={tier}
          className="rank-emblem"
        />
        <div className="info">
          <h2 className="queue-type">{queueType}</h2>
          <p className="tier">Tier:&nbsp;{tier + rank}</p>
          <p className="league-points">League Points:&nbsp;{leaguePoints}</p>
          <p className="score">
            <strong className="wins">WIN:&nbsp;{wins}</strong>
            <span className="division">&nbsp;|&nbsp;</span>
            <strong className="losses">LOSE:&nbsp;{losses}</strong>
          </p>
        </div>
      </article>
    </div>
  );
}

export default function Rank({
  loading,
  tier,
  queueType,
  rank,
  leaguePoints,
  wins,
  losses,
}) {
  if (loading) {
    return FakeRank();
  }
  return RankBox(tier, queueType, rank, leaguePoints, wins, losses);
}

Rank.propTypes = {
  loading: PropTypes.bool.isRequired,
};
