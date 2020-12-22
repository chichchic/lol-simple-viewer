import React from 'react';
import PropTypes from 'prop-types';

export default function ImgComponent({ src, alt, className }) {
  return <img src={src} alt={alt} className={className} />;
}

ImgComponent.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};
