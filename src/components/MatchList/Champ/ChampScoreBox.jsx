import React from 'react';
import PropTypes from 'prop-types';

export default function ChampScoreBox({
  kills,
  deaths,
  assists,
  goldEarned,
  totalKill,
}) {
  return (
    <div>
      <div className="kda">
        <span className="kill">{kills}</span>
        <span className="death">{deaths}</span>
        <span className="assist">{assists}</span>
      </div>
      <div className="ka-ratio">
        P / Kill:&nbsp;
        <span className="ka-ratio-score">
          {Math.floor((kills / totalKill) * 10000) / 100}
        </span>
        %
      </div>
      <div className="cs">
        Total Gold:&nbsp;<span className="gold">{goldEarned}</span>
      </div>
    </div>
  );
}

ChampScoreBox.prototype = {
  kills: PropTypes.number.isRequired,
  deaths: PropTypes.number.isRequired,
  assists: PropTypes.number.isRequired,
  goldEarned: PropTypes.number.isRequired,
  totalKill: PropTypes.number.isRequired,
};
