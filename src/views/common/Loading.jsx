import React from 'react';
import ReactLoading from 'react-loading';

import './Loading.scss';
export default function Loading() {
  return (
    <section className="loading">
      <ReactLoading type="spin" />
    </section>
  );
}
