import React from 'react';
import { PropTypes } from 'prop-types';

import {
  DEFAULT_VALUE,
  validatePositionValueProp,
  validatePercentProp,
  limitPosition,
  limitPercent,
} from '../../../helpers';

const BarPercentText = ({
  semiCircular,
  scale,
  fontFamily,
  percent: {
    value,
    showValue,
    fontSize,
    fontWeight,
    color,
    align,
    position: { X, Y } = {},
  } = {},
}) => {
  ({ X, Y } = limitPosition(semiCircular, X, Y));
  value = limitPercent(value);

  return (
    <text
      x={`${X}%`}
      y={semiCircular ? `${2 * Y}%` : `${Y}%`}
      textAnchor={align}
      dominantBaseline={align}
      fontFamily={fontFamily || DEFAULT_VALUE.fontFamily}
      fontSize={(fontSize || DEFAULT_VALUE.fontSize) * scale}
      fontWeight={fontWeight || DEFAULT_VALUE.fontWeight}
      fill={color || DEFAULT_VALUE.textColor}
      transform={`${semiCircular ? 'rotate(90)' : ''}`}
    >
      {(typeof showValue === 'boolean'
        ? showValue
        : DEFAULT_VALUE.showPercentValue) &&
      value !== null &&
      value !== undefined
        ? `${value} %`
        : null}
    </text>
  );
};

BarPercentText.propTypes = {
  semiCircular: PropTypes.bool,
  scale: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  fontFamily: PropTypes.string,
  percent: PropTypes.shape({
    value: (props, propsName, componentName) =>
      validatePercentProp(props, propsName, componentName),
    showValue: PropTypes.bool,
    fontSize: PropTypes.number,
    fontWeight: PropTypes.oneOf(['normal', 'bold']),
    color: PropTypes.string,
    align: PropTypes.oneOf(['start', 'middle', 'end']),
    position: PropTypes.shape({
      X: PropTypes.number.isRequired,
      Y: PropTypes.number.isRequired,
    }),
  }).isRequired,
  // Not a prop. Workarrownd to validate positon conditional to semiCircular props
  customValidation: (props, propName, componentName) =>
    validatePositionValueProp(props, componentName, 'percent'),
};

export default BarPercentText;
