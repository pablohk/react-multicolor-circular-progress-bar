import React from 'react';
import { PropTypes } from 'prop-types';

import {
  DEFAULT_VALUE,
  validatePositionValueProp,
  limitPosition,
} from '../../../helpers';

const BarTitle = ({
  semiCircular,
  scale,
  fontFamily,
  title: {
    name,
    fontSize,
    fontWeight,
    color,
    align,
    position: { X, Y } = {},
  } = {},
}) => {
  ({ X, Y } = limitPosition(semiCircular, X, Y));

  return (
    <text
      x={`${X}%`}
      y={semiCircular ? `${2 * Y}%` : `${Y}%`}
      textAnchor={align}
      dominantBaseline={align}
      fontFamily={fontFamily}
      fontSize={(fontSize || DEFAULT_VALUE.fontSize) * scale}
      fontWeight={fontWeight || DEFAULT_VALUE.fontWeight}
      fill={color || DEFAULT_VALUE.textColor}
      transform={`${semiCircular ? 'rotate(90)' : ''}`}
    >
      {name}
    </text>
  );
};

BarTitle.propTypes = {
  semiCircular: PropTypes.bool,
  scale: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  fontFamily: PropTypes.string,
  title: PropTypes.shape({
    name: PropTypes.string.isRequired,
    fontSize: PropTypes.number,
    fontWeight: PropTypes.oneOf(['normal', 'bold']),
    color: PropTypes.string,
    align: PropTypes.oneOf(['start', 'middle', 'end']),
    position: PropTypes.shape({
      X: PropTypes.number.isRequired,
      Y: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  // Not a prop. Workarrownd to validate positon conditional to semiCircular props
  customValidation: (props, propName, componentName) =>
    validatePositionValueProp(props, componentName, 'title'),
};

export default BarTitle;
