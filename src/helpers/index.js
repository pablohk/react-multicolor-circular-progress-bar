export const PORCENTAGE_RANGE = {
  min: 0,
  max: 100,
};

export const POSITION_RANGE = {
  X: {
    min: -50,
    max: 50,
  },
  Y: {
    min: -50,
    maxSemiCircular: 0,
    maxCircular: 50,
  },
};

export const DEFAULT_VALUE = {
  radiusIncrement: 50,
  scale: 1,
  angleTransition: [180],
  colors: ['#ff0000', '#00ff00'],
  color: '#eee',
  fontFamily: 'roboto',
  fontSize: 10,
  textColor: '#00000099',
  fontWeight: 'normal',
  align: 'middle',
  showPercentValue: true,
  gapGradient: 1,
  segmentColor: '#000',
  strokeWidth: 5,
  imageWidth: 1,
  X: 0,
  Y: 0,
  width: 1,
};

export function calcCoordinates(radius, segment) {
  return {
    xStart: radius * Math.sin((segment.sector.start * Math.PI) / 180),
    yStart: -radius * Math.cos((segment.sector.start * Math.PI) / 180),
    xStop: radius * Math.sin((segment.sector.stop * Math.PI) / 180),
    yStop: -radius * Math.cos((segment.sector.stop * Math.PI) / 180),
  };
}

export function generateSegments(
  colors,
  angleTransition,
  gapGradient,
  semiCircular
) {
  const iter = colors.length + angleTransition.length;
  const result = [];
  if (!gapGradient || gapGradient < 0) gapGradient = DEFAULT_VALUE.gapGradient;
  // If colors vs angleTransition relation is wrong, use default color
  // Colors array length must be equal to angleTransition array length + 1
  const endCircle = semiCircular ? 180 : 360;

  const checkedColors = colors.map((e) => {
    return privateCheckColor(e) ? e : DEFAULT_VALUE.segmentColor;
  });

  // check and limit the gapGradient if it is higher than angleTransition start or angleTransition stop
  const limitGapGradient = privateCalcLimitGap(
    angleTransition,
    endCircle,
    gapGradient
  );
  for (let i = 0; i < iter; i++) {
    // if angleTransitioin[x] has not a value ( ex: NaN ) put start to 0 (start circle) and stop to 360 or 180 (semiCircular) (end circle)

    let data = {};
    // Even Segment. No Gradient
    if (i % 2 === 0) {
      const startEvenAT = angleTransition[i / 2 - 1] || 0;
      const stopEvenAT = angleTransition[i / 2] || endCircle;

      data = {
        sector: {
          start:
            i === 0
              ? 0
              : startEvenAT +
                  limitGapGradient[i / 2 - 1 < 0 ? 0 : i / 2 - 1] / 2 ||
                endCircle,
          stop:
            i === iter - 1
              ? endCircle
              : stopEvenAT - limitGapGradient[i / 2 < 0 ? 0 : i / 2] / 2 ||
                endCircle,
        },
        color: {
          full: checkedColors[i / 2]
            ? checkedColors[i / 2]
            : DEFAULT_VALUE.segmentColor,
        },
      };
    }
    // Odd segment. Gradient color in this segment
    else {
      const startOddAT = angleTransition[(i - 1) / 2] || endCircle;
      data = {
        sector: {
          start:
            startOddAT -
              limitGapGradient[(i - 1) / 2 < 0 ? 0 : (i - 1) / 2] / 2 ||
            endCircle,
          stop:
            i === iter - 1
              ? endCircle
              : startOddAT +
                  limitGapGradient[(i - 1) / 2 < 0 ? 0 : (i - 1) / 2] / 2 ||
                endCircle,
        },
        color: {
          start: checkedColors[(i - 1) / 2]
            ? checkedColors[(i - 1) / 2]
            : DEFAULT_VALUE.segmentColor,
          stop: checkedColors[(i + 1) / 2]
            ? checkedColors[(i + 1) / 2]
            : DEFAULT_VALUE.segmentColor,
        },
      };
    }

    data.largeArcFlag = data.sector.stop - data.sector.start <= 180 ? 0 : 1;
    data.key = 100000 * Math.random();
    result.push(data);
  }
  return result;
}

export function validatePositionValueProp(props, componentName, propsName) {
  const RANGE = {
    X: POSITION_RANGE.X,
    Y: {
      min: POSITION_RANGE.Y.min,
      max: props.semiCircular
        ? POSITION_RANGE.Y.maxSemiCircular
        : POSITION_RANGE.Y.maxCircular,
    },
  };

  const errorMessage = [];
  const position = props[propsName].position;
  if (position && Object.keys(position).length > 0) {
    Object.keys(position).forEach((e) => {
      const value = position[e];
      let message = null;
      if (value === null || value === undefined) message = 'Requiered';
      else if (typeof value !== 'number') message = 'Expect type number';
      else if (value < RANGE[e].min || value > RANGE[e].max)
        message = `value = ${value} and exceed range [${RANGE[e].min},${RANGE[e].max}]`;

      if (message)
        errorMessage.push(
          `Invalid prop "${e}" supplied to ${componentName}. ${message}`
        );
    });
    if (errorMessage.length > 0) return new Error(errorMessage.join(' '));
  }
}

export function validatePercentProp(props, propsName, componentName) {
  const value = props[propsName];
  let message = null;

  if (value === null || value === undefined) message = 'Requiered';
  else if (typeof value !== 'number') message = 'Expect type number';
  else if (value < PORCENTAGE_RANGE.min || value > PORCENTAGE_RANGE.max)
    message = `value = ${value} and exceed range [${PORCENTAGE_RANGE.min},${PORCENTAGE_RANGE.max}]`;

  if (message)
    return new Error(
      `Invalid prop "${propsName}" supplied to ${componentName}. ${message}`
    );
}

export function validateAngleTransition(
  props,
  propsName,
  componentName,
  semiCircular
) {
  const value = props[propsName];
  let message = null;

  const notValidateRange = value.reduce(
    (acc, curr, idx) => {
      if (!acc.cond && (curr < 0 || curr > (semiCircular ? 180 : 360)))
        acc = { cond: true, idx };
      return acc;
    },
    { cond: false, idx: 0 }
  );

  if (value === null || value === undefined) message = 'Requiered';
  else if (!Array.isArray(value)) message = 'Expect type array';
  else if (value.length === 0) message = 'Expect not empty array';
  else if (notValidateRange.cond)
    message = `Value = ${value[notValidateRange.idx]} out of range [0, ${
      semiCircular ? '180' : '360'
    }]`;

  if (message)
    return new Error(
      `Invalid prop "${propsName}" supplied to ${componentName}. ${message}`
    );
}

export function limitPosition(semiCircular, X, Y) {
  return {
    X:
      X === undefined
        ? DEFAULT_VALUE.X
        : X > POSITION_RANGE.X.max
        ? POSITION_RANGE.X.max
        : X < POSITION_RANGE.X.min
        ? POSITION_RANGE.X.min
        : X,
    Y:
      Y === undefined
        ? DEFAULT_VALUE.Y
        : Y < POSITION_RANGE.Y.min
        ? POSITION_RANGE.Y.min
        : semiCircular && Y > POSITION_RANGE.Y.maxSemiCircular
        ? POSITION_RANGE.Y.maxSemiCircular
        : Y > POSITION_RANGE.Y.maxCircular
        ? POSITION_RANGE.Y.maxCircular
        : Y,
  };
}

export function limitPercent(percentValue) {
  return percentValue > PORCENTAGE_RANGE.max
    ? PORCENTAGE_RANGE.max
    : percentValue < PORCENTAGE_RANGE.min
    ? PORCENTAGE_RANGE.min
    : percentValue;
}

export function calcRingSize(radius, strokeWidth, scale, width, padding) {
  const initialValue = radius - strokeWidth / 2;
  const size = {
    radius: initialValue,
    width: width && width > 0 ? width * scale : 0,
  };

  if (padding && padding > 0) size.radius -= padding * scale;
  if (width && width > 0) size.radius -= (width / 2) * scale;
  if (size.width > size.radius * 2) {
    size.width = initialValue - (padding && padding > 0 ? padding * scale : 0);
    size.radius = size.width / 2;
  }

  if (size.radius < 0) size.radius = 0;
  if (size.width < 0) size.width = 0;

  return size;
}

function privateCheckColor(strColor) {
  const strColorLower = strColor.toLowerCase();
  // svg  not allow grandient rgb or hsl colors ,although allow stroke color. Developing convert it to hex
  // const regexColor =/(#([\da-f]{3}){1,2}|(rgb|hsl)a\((\d{1,3}%?,\s?){3}(1|0?\.\d+)\)|(rgb|hsl)\(\d{1,3}%?(,\s?\d{1,3}%?){2}\))/ig;
  const regexColor = /(#([\da-f]{3}){1,2})/gi;

  // eslint-disable-next-line no-undef
  const opt = new Option().style;
  opt.color = strColorLower;
  return opt.color === strColorLower || regexColor.test(strColorLower);
}

function privateCalcLimitGap(angleTransition, endCircle, gapGradient) {
  const angles = [0, ...angleTransition, endCircle];
  return angles.reduce((acc, curr, idx, arr) => {
    const stopGap = arr[idx + 2] - arr[idx + 1];
    const startGap = arr[idx + 1] - curr;

    if (!isNaN(stopGap) && !isNaN(startGap)) {
      const limit = Math.min(startGap, stopGap, gapGradient);
      acc.push(limit);
    }
    return acc;
  }, []);
}
