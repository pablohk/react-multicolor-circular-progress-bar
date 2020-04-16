import React from 'react';
import { PropTypes } from 'prop-types';

import { calcCoordinates } from '../../../helpers';

const BarPath = ({ segments, radius, stroke: { width } }) => {
  const paths = [];

  segments.forEach((segment, idx) => {
    const { xStart, yStart, xStop, yStop } = calcCoordinates(radius, segment);
    const largeArcFlag = segment.largeArcFlag;
    const arc = (
      <path
        key={`path-segment-${idx}`}
        stroke={
          segment.color.full
            ? segment.color.full
            : `url(#grad:${segment.key}-${segment.color.start}-${segment.color.stop})`
        }
        strokeWidth={width - 1}
        d={`M ${xStart.toFixed(3)}  ${yStart.toFixed(3)} 
           A ${radius} ${radius} 0 ${largeArcFlag} 1 ${xStop.toFixed(
          3
        )}  ${yStop.toFixed(3)}`}
      />
    );
    paths.push(arc);
  });

  return paths;
};

BarPath.propsTypes = {
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
      largeArcFlagss: PropTypes.string.isRequired,
    })
  ).isRequired,
  radius: PropTypes.number.isRequired,
  stroke: PropTypes.shape({
    width: PropTypes.number.isRequired,
  }).isRequired,
};
export default BarPath;
