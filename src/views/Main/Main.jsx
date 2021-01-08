import React from 'react';
import { useHistory } from 'react-router-dom';

import SummonerSearchBar from '../../components/common/SummonerSearchBar';
import TextLink from '../../components/common/TextLink';

import './Main.scss';

export default function Main() {
  const history = useHistory();

  function moveMatchListView(name) {
    history.push('/match-list/' + name);
  }

  return (
    <section className="main">
      <TextLink label="LoLSimpleViewer" url="/" fontSize="5rem" />
      <SummonerSearchBar callBack={moveMatchListView} />
    </section>
  );
}
