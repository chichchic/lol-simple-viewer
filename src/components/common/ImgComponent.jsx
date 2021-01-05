import React from 'react';
import PropTypes from 'prop-types';

export default function ImgComponent({ src, alt, className, borderColor }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{ borderColor: borderColor || 'inherit' }}
    />
  );
}

ImgComponent.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};
