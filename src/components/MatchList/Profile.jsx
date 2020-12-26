import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import ImgComponent from '../common/ImgComponent';

import './Profile.scss';

const profileUrl =
  'http://ddragon.leagueoflegends.com/cdn/10.25.1/img/profileicon/';

export default function Profile({ profileIconId, summonerLevel }) {
  const { name } = useParams();

  return (
    <article className="profile">
      <ImgComponent
        src={profileUrl + profileIconId + '.png'}
        alt={String(profileIconId)}
        className="profileIcon"
      />
      <div className="info">
        <div className="name">{name}</div>
        <div className="level">LV:&nbsp;{summonerLevel}</div>
      </div>
    </article>
  );
}

Profile.propTypes = {
  profileIconId: PropTypes.number.isRequired,
  summonerLevel: PropTypes.number.isRequired,
};
