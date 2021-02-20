import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import SearchBar from './SearchBar';
import { getsummonerInfo } from 'fixture/getInfoFuncs.js';

export default function SummonerSearchBar() {
  const apiKey = useSelector(({ apiKey: { key } }) => {
    return key;
  });
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
      await getsummonerInfo(name, apiKey);
      moveMatchListView(name);
    } catch (err) {
      alert('can not find the summoner');
    }
  }

  return <SearchBar onClick={searchsummoner} />;
}
