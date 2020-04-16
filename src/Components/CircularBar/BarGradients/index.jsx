import React from 'react';
import { PropTypes } from 'prop-types';

import { calcCoordinates } from '../../../helpers';

const BarGradients = ({ segments, radius }) => {
  const gradientes = [];

  segments.forEach((segment, idx) => {
    if (segment.color.start) {
      const { xStart, yStart, xStop, yStop } = calcCoordinates(radius, segment);
      const grad = (
        <linearGradient
          key={`grad${idx}`}
          id={`grad:${segment.key}-${segment.color.start}-${segment.color.stop}`}
          gradientUnits='userSpaceOnUse'
          x1={xStart.toFixed(3)}
          y1={yStart.toFixed(3)}
          x2={xStop.toFixed(3)}
          y2={yStop.toFixed(3)}
        >
          <stop offset='0%' stopColor={segment.color.start} />
          <stop offset='100%' stopColor={segment.color.stop} />
        </linearGradient>
      );
      gradientes.push(grad);
    }
  });
  return <defs>{gradientes}</defs>;
};

BarGradients.propsTypes = {
  segments: PropTypes.arrayOf(
    PropTypes.shape({
      sector: PropTypes.shape({
        start: PropTypes.number,
        stop: PropTypes.number,
      }).isRequired,
      color: PropTypes.shape({
        full: PropTypes.string,
        start: PropTypes.string,
        stop: PropTypes.string,
      }).isRequired,
    }).isRequired
  ).isRequired,
  radius: PropTypes.number.isRequired,
};

export default BarGradients;
