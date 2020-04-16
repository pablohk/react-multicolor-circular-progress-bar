import React from 'react';

import { shallow } from 'enzyme';

import BarGradients from './index';

describe('<BarGradients />', () => {
  const twoSegments = [
    {
      sector: { start: 0, stop: 175 },
      color: { full: 'green' },
      largeArcFlag: 0,
    },
    {
      sector: { start: 175, stop: 185 },
      color: { start: 'green', stop: 'red' },
      largeArcFlag: 0,
    },
    {
      sector: { start: 185, stop: 360 },
      color: { full: 'red' },
      largeArcFlag: 0,
    },
  ];

  const threeSegments = [
    {
      sector: { start: 0, stop: 110 },
      color: { full: 'green' },
      largeArcFlag: 0,
    },
    {
      sector: { start: 110, stop: 130 },
      color: { start: 'green', stop: 'yellow' },
      largeArcFlag: 0,
    },
    {
      sector: { start: 130, stop: 230 },
      color: { full: 'yellow' },
      largeArcFlag: 0,
    },
    {
      sector: { start: 230, stop: 250 },
      color: { start: 'yellow', stop: 'red' },
      largeArcFlag: 0,
    },
    {
      sector: { start: 250, stop: 360 },
      color: { full: 'red' },
      largeArcFlag: 0,
    },
  ];

  const defaultProps = {
    segments: twoSegments,
    radius: 150,
  };

  it('should render correctly', () => {
    const wrapper = shallow(<BarGradients {...defaultProps} />);

    expect(wrapper).toBeDefined();
  });

  it('should render correctly with 2 colors', () => {
    const wrapper = shallow(<BarGradients {...defaultProps} />);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('defs').length).toBe(1);
    expect(wrapper.find('linearGradient').length).toBe(1);
  });

  it('should render correctly with 3 colors', () => {
    const wrapper = shallow(
      <BarGradients {...defaultProps} segments={threeSegments} />
    );

    expect(wrapper).toBeDefined();
    expect(wrapper.find('defs').length).toBe(1);
    expect(wrapper.find('linearGradient').length).toBe(2);
  });

  it('should no render with segments props is a empty array', () => {
    const newProps = JSON.parse(JSON.stringify(defaultProps));
    newProps.segments = [];

    const wrapper = shallow(<BarGradients {...newProps} />);

    expect(wrapper).toEqual({});
    expect(wrapper.find('path').length).toBe(0);
    expect(wrapper.find('linearGradient').length).toBe(0);
  });

  it('should throw error if no segments prop is supplied', () => {
    const newProps = JSON.parse(JSON.stringify(defaultProps));
    newProps.segments = null;

    try {
      shallow(<BarGradients {...newProps} />);
    } catch (error) {
      expect(error).toEqual(
        new Error(`Cannot read property 'forEach' of null`)
      );
    }
  });
});
