import React from 'react';

import { shallow } from 'enzyme';

import BarPath from './index';

const stroke = {
  width: 7,
};

const segments = [
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

const defaultProps = {
  segments,
  radius: 150,
  stroke,
};

describe('<BarPath />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<BarPath {...defaultProps} />);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('path').length).toBe(defaultProps.segments.length);
  });

  it('should no render with segments props is a empty array', () => {
    const newProps = JSON.parse(JSON.stringify(defaultProps));
    newProps.segments = [];

    const wrapper = shallow(<BarPath {...newProps} />);
    expect(wrapper).toEqual({});
    expect(wrapper.find('path').length).toBe(0);
  });

  it('should throw error if no segments prop is supplied', () => {
    const newProps = JSON.parse(JSON.stringify(defaultProps));
    newProps.segments = null;

    try {
      shallow(<BarPath {...newProps} />);
    } catch (error) {
      expect(error).toEqual(
        new Error(`Cannot read property 'forEach' of null`)
      );
    }
  });

  it('should throw error if no stroke prop is supplied', () => {
    const newProps = JSON.parse(JSON.stringify(defaultProps));
    newProps.stroke = null;

    try {
      shallow(<BarPath {...newProps} />);
    } catch (error) {
      expect(error).toEqual(
        new Error(
          "Cannot destructure property `width` of 'undefined' or 'null'."
        )
      );
    }
  });
});
