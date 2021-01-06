import React from 'react';

import Routes from './Routes';
import Loading from './views/common/Loading';
import { useDispatch } from 'react-redux';

import './App.scss';
export default function App() {
  return <Loading />;
  // return <Routes />;
}
