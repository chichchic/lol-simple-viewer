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
    history.push(url);
  }

  return (
    <Button
      className="text-link"
      type="button"
      onClick={handleClick}
      fontSize={fontSize}
    >
      {label}
    </Button>
  );
}

TextLink.propTypes = {
  label: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
