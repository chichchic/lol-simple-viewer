import React from 'react';

import TextLink from '../../components/common/TextLink';

import './NotFound.scss';

export default function NotFound() {
  return (
    <section className="request-err">
      <TextLink label="LoLSimpleViewer" url="/" fontSize="5rem" />
      <p>sorry. we can not find the page</p>
    </section>
  );
}
