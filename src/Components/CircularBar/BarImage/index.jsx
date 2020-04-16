import React from 'react';
import PropTypes from 'prop-types';

import {
  DEFAULT_VALUE,
  validatePositionValueProp,
  limitPosition,
} from '../../../helpers';

const BarImage = ({
  semiCircular,
  scale,
  image: { width, path, position: { X, Y } = {} } = {},
}) => {
  ({ X, Y } = limitPosition(semiCircular, X, Y));

  return (
    <image
      x={`${X - (width || DEFAULT_VALUE.imageWidth) / 2}%`}
      y={
        semiCircular
          ? `${2 * Y - (width || DEFAULT_VALUE.imageWidth)}%`
          : `${Y - (width || DEFAULT_VALUE.imageWidth) / 2}%`
      }
      width={(width || DEFAULT_VALUE.imageWidth) * scale}
      href={path}
      transform={`${semiCircular ? 'rotate(90)' : ''}`}
    />
  );
};

BarImage.propTypes = {
  semiCircular: PropTypes.bool,
  scale: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  image: PropTypes.shape({
    path: PropTypes.string.isRequired,
    width: PropTypes.number,
    position: PropTypes.shape({
      X: PropTypes.number.isRequired,
      Y: PropTypes.number.isRequired,
    }),
  }).isRequired,
  // Not a prop. Workarrownd to validate positon conditional to semiCircular props
  customValidation: (props, propName, componentName) =>
    validatePositionValueProp(props, componentName, 'image'),
};

export default BarImage;
