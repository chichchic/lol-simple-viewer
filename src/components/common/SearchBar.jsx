import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

import './SearchBar.scss';

export default function SearchBar({ onClick = () => {} }) {
  const initInputValue = '';
  const [inputValue, changeInputValue] = useState(initInputValue);
  function onClickButton() {
    onClick(inputValue);
    changeInputValue(initInputValue);
  }
  return (
    <div className="search-bar">
      <input
        className="search-bar--input"
        onChange={(e) => changeInputValue(e.target.value)}
        onKeyDown={(e) => {
          e.key == 'Enter' && onClickButton();
        }}
        value={inputValue}
      />
      <Button label="search" onClick={onClickButton} />
    </div>
  );
}

SearchBar.propTypes = {
  onClick: PropTypes.func,
};
