import React from 'react';
import ReactLoading from 'react-loading';

import './ComponentLoading.scss';
export default function Loading() {
  return (
    <section className="component-loading">
      <ReactLoading type="bubbles" />
    </section>
  );
}
