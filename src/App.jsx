import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getJson } from './store/action/json';

import Routes from './Routes';
import Loading from './views/common/Loading';

import './App.scss';
export default function App() {
  const dispatch = useDispatch();
  const dragonJson = useSelector((state) => state.json);
  const [hasJson, setHasJson] = useState(false);

  useEffect(() => {
    for (const key in dragonJson) {
      if (!dragonJson[key]) {
        (async () => {
          setHasJson(false);
          await dispatch(getJson());
          setHasJson(true);
        })();
      }
    }
  }, [dragonJson, dispatch]);

  if (!hasJson) {
    return <Loading />;
  }
  return <Routes />;
}
