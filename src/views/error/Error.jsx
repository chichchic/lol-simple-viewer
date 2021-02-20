import React from 'react';

import TextLink from 'components/common/TextLink';

import './Error.scss';

export default function NotFound({ text }) {
  return (
    <section className="request-err">
      <TextLink label="LoLSimpleViewer" url="/" fontSize="5rem" />
      <p>{text}</p>
    </section>
  );
}
