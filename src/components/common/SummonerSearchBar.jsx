import React from 'react';

import SearchBar from './SearchBar';
import { getsummonerInfo } from '../../fixture/getInfoFuncs.js';

export default function SummonerSearchBar({ callBack }) {
  async function searchsummoner(name) {
    if (name === '') {
      alert("Empty text can't be submitted!");
      return;
    }
    try {
      await getsummonerInfo(name);
      callBack && callBack(name);
    } catch (err) {
      alert('can not find the summoner');
    }
  }

  return <SearchBar onClick={searchsummoner} />;
}
