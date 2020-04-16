import React from 'react';

import { shallow } from 'enzyme';

import CircularBar from './index';
import BarGradients from './BarGradients/index';
import BarRing from './BarRing/index';
import BarImage from './BarImage/index';
import BarTitle from './BarTitle/index';
import BarPercentText from './BarPercentText/index';
import BarPath from './BarPath/index';
import BarStroke from './BarStroke/index';

import { DEFAULT_VALUE, calcRingSize } from '../../helpers';

const title = {
  name: 'fakeTitle',
  position: {
    X: 5,
    Y: -5,
  },
  fontSize: 18,
  fontWeight: 'normal',
  color: 'blue',
  align: 'start',
};

const percent = {
  value: 50,
  showValue: true,
  fontSize: 15,
  fontWeight: 'normal',
  color: 'red',
  align: 'start',
  position: {
    X: 5,
    Y: -5,
  },
};

const image = {
  path: 'fakePath',
  width: 30,
  position: {
    X: 5,
    Y: -5,
  },
};

const ring = {
  bgColor: 'white',
  width: 5,
  color: 'orange',
  padding: 5,
};

const stroke = {
  color: 'gray',
  width: 5,
};

const defaultProps = {
  fontFamily: 'arial',
  scale: 2,
  gapGradient: 5,
  angleTransition: [40, 90, 180],
  colors: ['green', 'red', 'blue', 'pink'],
  semiCircular: false,
  title,
  percent,
  image,
  stroke,
  ring,
};

describe('<CircularBar />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<CircularBar {...defaultProps} />);

    expect(wrapper.find('svg').length).toEqual(1);

    expect(wrapper.find('g').length).toEqual(1);
    expect(wrapper.find('g').prop('transform')).toEqual(
      `translate(${DEFAULT_VALUE.radiusIncrement * defaultProps.scale},${
        DEFAULT_VALUE.radiusIncrement * defaultProps.scale
      })`
    );

    expect(wrapper.find(BarGradients).length).toEqual(1);
    expect(wrapper.find(BarGradients).prop('segments').length).toEqual(
      defaultProps.angleTransition.length + defaultProps.colors.length
    );

    expect(wrapper.find(BarRing).length).toEqual(1);
    expect(wrapper.find(BarRing).prop('bgColor')).toEqual(
      defaultProps.ring.bgColor
    );
    expect(wrapper.find(BarRing).prop('color')).toEqual(
      defaultProps.ring.color
    );
    expect(wrapper.find(BarRing).prop('size')).toEqual(
      calcRingSize(
        DEFAULT_VALUE.radiusIncrement * defaultProps.scale,
        defaultProps.stroke.width * defaultProps.scale,
        defaultProps.scale,
        defaultProps.ring.width,
        defaultProps.ring.padding
      )
    );

    expect(wrapper.find(BarImage).length).toEqual(1);
    expect(wrapper.find(BarImage).prop('image')).toEqual(defaultProps.image);

    expect(wrapper.find(BarTitle).length).toEqual(1);
    expect(wrapper.find(BarTitle).prop('title')).toEqual(defaultProps.title);

    expect(wrapper.find(BarPercentText).length).toEqual(1);
    expect(wrapper.find(BarPercentText).prop('percent')).toEqual(
      defaultProps.percent
    );

    expect(wrapper.find(BarPath).length).toEqual(1);
    expect(wrapper.find(BarPath).prop('stroke')).toEqual({
      ...defaultProps.stroke,
      width: defaultProps.stroke.width * defaultProps.scale,
    });

    expect(wrapper.find(BarStroke).length).toEqual(1);
  });

  it('should render without props', () => {
    const wrapper = shallow(<CircularBar />);

    expect(wrapper.find('svg').length).toEqual(1);

    expect(wrapper.find('g').length).toEqual(1);
    expect(wrapper.find('g').prop('transform')).toEqual(
      `translate(${DEFAULT_VALUE.radiusIncrement * DEFAULT_VALUE.scale},${
        DEFAULT_VALUE.radiusIncrement * DEFAULT_VALUE.scale
      })`
    );

    expect(wrapper.find(BarGradients).length).toEqual(1);
    expect(wrapper.find(BarGradients).prop('segments').length).toEqual(
      DEFAULT_VALUE.angleTransition.length + DEFAULT_VALUE.colors.length
    );
    expect(wrapper.find(BarGradients).prop('radius')).toEqual(
      DEFAULT_VALUE.scale * DEFAULT_VALUE.radiusIncrement
    );

    expect(wrapper.find(BarRing).length).toEqual(0);

    expect(wrapper.find(BarImage).length).toEqual(0);

    expect(wrapper.find(BarTitle).length).toEqual(0);

    expect(wrapper.find(BarPercentText).length).toEqual(0);

    expect(wrapper.find(BarPath).length).toEqual(1);
    expect(wrapper.find(BarPath).prop('stroke')).toEqual({
      color: DEFAULT_VALUE.color,
      width: DEFAULT_VALUE.strokeWidth * DEFAULT_VALUE.scale,
    });

    expect(wrapper.find(BarStroke).length).toEqual(1);
    expect(wrapper.find(BarStroke).prop('semiCircular')).toBeUndefined();
    expect(wrapper.find(BarStroke).prop('percent')).toBeUndefined();
  });

  it('should render semicircular', () => {
    const wrapper = shallow(<CircularBar {...defaultProps} semiCircular />);

    expect(wrapper.find('svg').length).toEqual(1);
    expect(wrapper.find('g').length).toEqual(1);
    expect(wrapper.find('g').prop('transform')).toEqual(
      `translate(${DEFAULT_VALUE.radiusIncrement * defaultProps.scale},${
        DEFAULT_VALUE.radiusIncrement * defaultProps.scale
      }) rotate(-90)`
    );
  });

  it('should render without title', () => {
    const newProps = JSON.parse(JSON.stringify(defaultProps));
    delete newProps.title;
    const wrapper = shallow(<CircularBar {...newProps} />);

    expect(wrapper.find(BarTitle).length).toEqual(0);
  });

  it('should render without image', () => {
    const newProps = JSON.parse(JSON.stringify(defaultProps));
    delete newProps.image;
    const wrapper = shallow(<CircularBar {...newProps} />);

    expect(wrapper.find(BarImage).length).toEqual(0);
  });

  it('should render without percent text value', () => {
    const newProps = JSON.parse(JSON.stringify(defaultProps));
    delete newProps.percent;
    const wrapper = shallow(<CircularBar {...newProps} />);

    expect(wrapper.find(BarPercentText).length).toEqual(0);
  });

  it('should throw error wrong type of angle transition prop', () => {
    const newProps = JSON.parse(JSON.stringify(defaultProps));
    newProps.angleTransition = 7;

    try {
      shallow(<CircularBar {...newProps} />);
    } catch (error) {
      expect(error).toEqual(new Error('angleTransition is not iterable'));
    }
  });

  it('should throw error wrong type of colors prop', () => {
    const newProps = JSON.parse(JSON.stringify(defaultProps));
    newProps.colors = 7;

    try {
      shallow(<CircularBar {...newProps} />);
    } catch (error) {
      expect(error).toEqual(new Error('colors.map is not a function'));
    }
  });
});
