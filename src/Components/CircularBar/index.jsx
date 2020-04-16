import React from 'react';
import PropTypes from 'prop-types';

import {
  DEFAULT_VALUE,
  generateSegments,
  calcRingSize,
  validateAngleTransition,
} from '../../helpers';

import BarImage from './BarImage/index';
import BarTitle from './BarTitle/index';
import BarPercentText from './BarPercentText/index';
import BarRing from './BarRing/index';
import BarStroke from './BarStroke/index';
import BarGradients from './BarGradients/index';
import BarPath from './BarPath/index';

const CircularBar = ({
  fontFamily,
  scale,
  gapGradient,
  angleTransition,
  colors,
  semiCircular,
  title,
  percent,
  image,
  stroke,
  ring,
}) => {
  const radius = DEFAULT_VALUE.radiusIncrement * scale;
  const copyOfStroke = JSON.parse(JSON.stringify(stroke));
  copyOfStroke.width *= scale;
  const strokeWidth = copyOfStroke.width;

  const svgWidth = 2 * radius + strokeWidth;
  const svgHeight = semiCircular
    ? radius + strokeWidth / 2
    : 2 * radius + strokeWidth;
  const viewBox = {
    Xmin: -strokeWidth / 2,
    Ymin: -strokeWidth / 2,
    width: 2 * radius + strokeWidth,
    height: semiCircular ? radius + strokeWidth / 2 : radius * 2 + strokeWidth,
  };
  const segments = generateSegments(
    colors,
    angleTransition,
    gapGradient,
    semiCircular
  );

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xlinkHref='http://www.w3.org/1999/xlink'
      version='1.1'
      width={svgWidth}
      height={svgHeight}
      viewBox={`${viewBox.Xmin} ${viewBox.Ymin} ${viewBox.width} ${viewBox.height}`}
    >
      <BarGradients segments={segments} radius={radius} />
      <g
        id='paths'
        fill='none'
        transform={
          semiCircular
            ? `translate(${radius},${radius}) rotate(-90)`
            : `translate(${radius},${radius})`
        }
      >
        {ring && (
          <BarRing
            size={calcRingSize(
              radius,
              strokeWidth,
              scale,
              ring.width,
              ring.padding
            )}
            bgColor={ring.bgColor}
            color={ring.color}
          />
        )}
        {image && (
          <BarImage semiCircular={semiCircular} scale={scale} image={image} />
        )}
        {title && (
          <BarTitle
            semiCircular={semiCircular}
            scale={scale}
            fontFamily={fontFamily}
            title={title}
          />
        )}
        {percent && (
          <BarPercentText
            semiCircular={semiCircular}
            scale={scale}
            fontFamily={fontFamily}
            percent={percent}
          />
        )}
        <BarPath segments={segments} radius={radius} stroke={copyOfStroke} />
        <BarStroke
          semiCircular={semiCircular}
          radius={radius}
          stroke={copyOfStroke}
          percent={percent}
        />
      </g>
    </svg>
  );
};

CircularBar.defaultProps = {
  scale: DEFAULT_VALUE.scale,
  angleTransition: DEFAULT_VALUE.angleTransition,
  colors: DEFAULT_VALUE.colors,
  stroke: {
    color: DEFAULT_VALUE.color,
    width: DEFAULT_VALUE.strokeWidth,
  },
};

CircularBar.propTypes = {
  fontFamily: PropTypes.string,
  scale: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  gapGradient: PropTypes.number,
  semiCircular: PropTypes.bool,
  angleTransition: (props, propName, componentName) =>
    validateAngleTransition(props, propName, componentName),
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.shape({
    name: PropTypes.string.isRequired,
    fontSize: PropTypes.number,
    fontWeight: PropTypes.oneOf(['normal', 'bold']),
    color: PropTypes.string,
    align: PropTypes.oneOf(['start', 'middle', 'end']),
    position: PropTypes.shape({
      X: PropTypes.number.isRequired,
      Y: PropTypes.number.isRequired,
    }),
  }),
  percent: PropTypes.shape({
    value: PropTypes.number.isRequired,
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
  image: PropTypes.shape({
    path: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    position: PropTypes.shape({
      X: PropTypes.number.isRequired,
      Y: PropTypes.number.isRequired,
    }),
  }),
  stroke: PropTypes.shape({
    color: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
  }).isRequired,
  ring: PropTypes.shape({
    bgColor: PropTypes.string,
    width: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    padding: PropTypes.number,
  }),
};

export default CircularBar;
