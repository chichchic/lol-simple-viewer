import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import SearchBar from './SearchBar';
import { getsummonerInfo } from 'fixture/getInfoFuncs.js';
import { setApiKey } from 'store/action/apiKey.js';

export default function SummonerSearchBar() {
  const apiKey = useSelector(({ apiKey: { key } }) => {
    return key;
  });
  const dispatch = useDispatch();

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
      if (err === 403) {
        alert('The api key is Wrong or Expired');
        localStorage.removeItem('lol-token');
        dispatch(setApiKey(''));
      } else if (err === 404) {
        alert('can not find the summoner');
      }
    }
  }

  return <SearchBar onClick={searchsummoner} />;
}
