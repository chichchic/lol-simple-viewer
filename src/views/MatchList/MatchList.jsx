import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import InfoBoxList from '../../components/MatchList/InfoBoxList';

import './MatchList.scss';

import { getJson } from '../../store/action/json';

export default function MatchList() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function getJsonDatas() {
      await dispatch(getJson());
    }
    getJsonDatas();
  }, [dispatch]);

  return (
    <section>
      <InfoBoxList />
    </section>
  );
}
