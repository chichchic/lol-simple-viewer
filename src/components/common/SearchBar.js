import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

import './SearchBar.scss';

export default function SearchBar({ onClick = () => {} }) {
  const [inputValue, changeInputValue] = useState('');
  function onClickButton() {
    onClick(inputValue);
    changeInputValue('');
  }
  return (
    <div className="search-bar">
      <input
        className="search-bar--input"
        onChange={(e) => changeInputValue(e.target.value)}
        value={inputValue}
      />
      <Button label="search" onClick={onClickButton} />
    </div>
  );
}

SearchBar.propTypes = {
  onClick: PropTypes.func,
};
