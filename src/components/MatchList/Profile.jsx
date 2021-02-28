import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import ImgComponent from '../common/ImgComponent';

import './Profile.scss';

const profileUrl =
  'https://ddragon.leagueoflegends.com/cdn/11.4.1/img/profileicon/';

function FakePrifile() {
  return (
    <article className="profile">
      <div className="fake-img"></div>
      <div className="info">
        <div className="fake-title"></div>
        <div className="fake-description"></div>
      </div>
    </article>
  );
}

export default function Profile({ loading, profileIconId, summonerLevel }) {
  const { name } = useParams();
  if (loading) {
    return FakePrifile();
  }
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
  loading: PropTypes.bool.isRequired,
};
