import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SummonerSearchBar from '../../components/common/SummonerSearchBar';
import TextLink from '../../components/common/TextLink';
import Button from '../../components/common/Button';

import { setApiKey } from '../../store/action/apiKey.js';

import './ApiKey.scss';

export default function ApiKey() {
  const [key, setKey] = useState('');
  const dispatch = useDispatch();
  function registKey() {
    if (key === '') {
      return;
    }
    dispatch(setApiKey(key));
  }
  return (
    <section className="api-key">
      <TextLink label="LoLSimpleViewer" fontSize="5rem" />
      <p>We need api-key for using Riot's API</p>
      <div className="riot-dev-site">
        <p>You can get API-key in here :</p>
        <a href="https://developer.riotgames.com/">
          <img src="./img/riotLogo.png" alt="riot developer" />
        </a>
      </div>
      <div className="api-key--input">
        <span>KEY:&nbsp;</span>
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          onKeyDown={(e) => {
            e.key === 'Enter' && registKey();
          }}
        />
        <Button label="regist" onClick={registKey} />
      </div>
    </section>
  );
}
