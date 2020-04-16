import React from 'react';
import { PropTypes } from 'prop-types';

const BarRing = ({ size: { radius, width } = {}, bgColor, color }) => {
  return radius ? (
    <circle
      fill={bgColor}
      stroke={color}
      strokeWidth={width}
      cx={0}
      cy={0}
      r={radius}
    />
  ) : null;
};

BarRing.propTypes = {
  size: PropTypes.shape({
    radius: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }).isRequired,
  bgColor: PropTypes.string,
  color: PropTypes.string.isRequired,
};

export default BarRing;
