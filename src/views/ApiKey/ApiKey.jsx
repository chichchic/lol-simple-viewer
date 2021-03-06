import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import TextLink from 'components/common/TextLink';
import Button from 'components/common/Button';

import { setApiKey } from 'store/action/apiKey.js';

import './ApiKey.scss';

export default function ApiKey() {
  const [key, setKey] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('lol-token');
    if (token !== null) {
      dispatch(setApiKey(token));
    }
  }, [dispatch]);
  function registKey() {
    if (key === '') {
      return;
    }
    localStorage.setItem('lol-token', key);
    dispatch(setApiKey(key));
  }
  return (
    <section className="api-key">
      <TextLink label="LoLSimpleViewer" fontSize="5rem" />
      <p>We need api-key for using Riot's API</p>
      <div className="riot-dev-site">
        <p>You can get API-key in here :</p>
        <a href="https://developer.riotgames.com/">
          <img
            src="https://localhost:3000/img/riotLogo.png"
            alt="riot developer"
          />
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
