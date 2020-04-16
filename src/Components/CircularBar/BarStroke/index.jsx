import React from 'react';
import { PropTypes } from 'prop-types';

import { limitPercent, validatePercentProp } from '../../../helpers';

const BarStroke = ({
  semiCircular,
  radius,
  stroke: { color, width },
  percent: { value } = {},
}) => {
  value = limitPercent(value);

  return (
    <circle
      transform='rotate(-90)'
      fill='none'
      stroke={color}
      strokeWidth={width}
      strokeDashoffset={
        (semiCircular ? -1 : -2) * Math.PI * radius * (value / 100)
      }
      strokeDasharray={(semiCircular ? 1 : 2) * Math.PI * radius}
      cx={0}
      cy={0}
      r={radius}
    />
  );
};

BarStroke.propTypes = {
  semiCircular: PropTypes.bool,
  radius: PropTypes.number.isRequired,
  percent: PropTypes.shape({
    value: (props, propsName, componentName) =>
      validatePercentProp(props, propsName, componentName),
  }).isRequired,
  stroke: PropTypes.shape({
    color: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
  }).isRequired,
};
export default BarStroke;
