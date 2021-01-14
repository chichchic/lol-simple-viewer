import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { getJson } from './store/action/json';

import Routes from './Routes';
import Loading from './views/common/Loading';
import Error from './views/error/Error';
import ApiKey from './views/ApiKey/ApiKey';

import './App.scss';
export default function App() {
  const dispatch = useDispatch();
  const dragonJson = useSelector(({ json }) => json);
  const apiKey = useSelector(({ apiKey: { key } }) => {
    return key;
  });
  const [hasJson, setHasJson] = useState('init');
  const [hasKey, setHasKey] = useState(null);
  useEffect(() => {
    for (const key in dragonJson) {
      if (!dragonJson[key]) {
        (async () => {
          try {
            setHasJson('loading');
            await dispatch(getJson());
            setHasJson('complete');
          } catch (err) {
            setHasJson('error');
          }
        })();
      }
    }
  }, [dragonJson, dispatch]);

  useEffect(() => {
    if (apiKey) {
      setHasKey(apiKey);
    }
  }, [apiKey]);
  if (!hasKey) {
    return <ApiKey />;
  }
  switch (hasJson) {
    case 'loading':
      return <Loading />;
    case 'error':
      return <Error text={"can't get dragonJson data"} />;
    case 'complete':
      return <Routes />;
    default:
      return <Error text={"can't get dragonJson data"} />;
  }
}
