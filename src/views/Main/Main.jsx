import React from 'react';

import SummonerSearchBar from '../../components/common/SummonerSearchBar';
import TextLink from '../../components/common/TextLink';

import './Main.scss';

export default function Main() {
  return (
    <section className="main">
      <TextLink label="LoLSimpleViewer" url="/" fontSize="5rem" />
      <SummonerSearchBar />
    </section>
  );
}
