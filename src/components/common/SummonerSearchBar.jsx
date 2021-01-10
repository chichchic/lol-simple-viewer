import React from 'react';
import { useHistory } from 'react-router-dom';

import SearchBar from './SearchBar';
import { getsummonerInfo } from '../../fixture/getInfoFuncs.js';

export default function SummonerSearchBar() {
  const history = useHistory();

  function moveMatchListView(name) {
    history.push('/match-list/' + name);
  }
  async function searchsummoner(name) {
    if (name === '') {
      alert("Empty text can't be submitted!");
      return;
    }
    try {
      await getsummonerInfo(name);
      moveMatchListView(name);
    } catch (err) {
      alert('can not find the summoner');
    }
  }

  return <SearchBar onClick={searchsummoner} />;
}
