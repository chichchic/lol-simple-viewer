import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss';

export default function Button({ label = 'click', onClick = () => {} }) {
  return (
    <button className="btn" onClick={onClick}>
      {label}
    </button>
  );
}

Button.propTypes = {
  label: PropTypes.string,
};
