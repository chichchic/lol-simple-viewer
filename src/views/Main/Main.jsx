import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import SearchBar from '../../components/common/SearchBar';
import TextLink from '../../components/common/TextLink';

import './Main.scss';

import { getSummonorInfo } from '../../store/action/summonor';

export default function Main() {
  const history = useHistory();
  const dispatch = useDispatch();

  async function searchSummonor(name) {
    if (name === '') {
      alert("Can't search empty string name");
      return;
    }
    await dispatch(getSummonorInfo(name));
    history.push('/list');
  }

  return (
    <section className="main">
      <TextLink label="LoLSimpleViewer" url="/" fontSize="5rem" />
      <SearchBar onClick={searchSummonor} />
    </section>
  );
}
