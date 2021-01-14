import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import './TextLink.scss';

const Button = styled.button`
  font-size: ${(props) => props.fontSize || 'inherit'};
`;

export default function TextLink({ label, url, fontSize }) {
  const history = useHistory();

  function handleClick() {
    if (url) {
      history.push(url);
    }
  }

  return (
    <Button
      className="text-link"
      type="button"
      onClick={handleClick}
      fontSize={fontSize}
      style={{
        cursor: url ? 'pointer' : 'default',
      }}
    >
      {label}
    </Button>
  );
}

TextLink.propTypes = {
  label: PropTypes.string.isRequired,
};
