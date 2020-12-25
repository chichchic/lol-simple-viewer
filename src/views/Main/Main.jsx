import React from 'react';
import { useHistory } from 'react-router-dom';

import SearchBar from '../../components/common/SearchBar';
import TextLink from '../../components/common/TextLink';

import './Main.scss';

export default function Main() {
  const history = useHistory();

  function searchsummoner(name) {
    history.push('/match-list/' + name);
  }

  return (
    <section className="main">
      <TextLink label="LoLSimpleViewer" url="/" fontSize="5rem" />
      <SearchBar onClick={searchsummoner} />
    </section>
  );
}
