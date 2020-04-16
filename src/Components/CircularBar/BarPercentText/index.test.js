import React from 'react';

import { shallow } from 'enzyme';

import BarPercentText from './index';
import {
  DEFAULT_VALUE,
  POSITION_RANGE,
  PORCENTAGE_RANGE,
} from '../../../helpers';

describe('<BarPercentText />', () => {
  const percent = {
    value: 90,
    showValue: true,
    fontSize: 12,
    fontWeight: 'bold',
    color: 'red',
    align: 'middle',
    position: {
      X: 10,
      Y: -10,
    },
  };

  const defaultProps = {
    semiCircular: false,
    scale: 1,
    fontFamily: 'arial',
    percent,
  };

  it('should render correctly', () => {
    const wrapper = shallow(<BarPercentText {...defaultProps} />);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('text').prop('transform')).toBe('');
    expect(wrapper.find('text').prop('x')).toBe(`${percent.position.X}%`);
    expect(wrapper.find('text').prop('y')).toBe(`${percent.position.Y}%`);
    expect(wrapper.find('text').prop('textAnchor')).toBe(percent.align);
    expect(wrapper.find('text').prop('dominantBaseline')).toBe(percent.align);
    expect(wrapper.find('text').prop('fontSize')).toBe(percent.fontSize);
    expect(wrapper.find('text').prop('fontWeight')).toBe(percent.fontWeight);
    expect(wrapper.find('text').prop('fill')).toBe(percent.color);
    expect(wrapper.find('text').text()).toBe(`${percent.value} %`);
  });

  it('should render with semicircular active', () => {
    const wrapper = shallow(<BarPercentText {...defaultProps} semiCircular />);
    expect(wrapper.find('text').prop('transform')).toBe('rotate(90)');
  });

  it('should render without show percent value', () => {
    const newProps = JSON.parse(JSON.stringify(defaultProps));
    newProps.percent.showValue = false;

    const wrapper = shallow(<BarPercentText {...newProps} />);
    expect(wrapper.find('text').text()).toBe('');
  });

  it('should render without "percent" prop', () => {
    const newProps = JSON.parse(JSON.stringify(defaultProps));
    delete newProps.percent;
    delete newProps.fontFamily;
    const wrapper = shallow(<BarPercentText {...newProps} />);

    expect(wrapper.find('text').prop('x')).toBe(`${DEFAULT_VALUE.X}%`);
    expect(wrapper.find('text').prop('y')).toBe(`${DEFAULT_VALUE.Y}%`);
    expect(wrapper.find('text').prop('textAnchor')).toBeUndefined();
    expect(wrapper.find('text').prop('dominantBaseline')).toBeUndefined();
    expect(wrapper.find('text').prop('fontFamily')).toBe(
      DEFAULT_VALUE.fontFamily
    );
    expect(wrapper.find('text').prop('fontSize')).toBe(DEFAULT_VALUE.fontSize);
    expect(wrapper.find('text').prop('fontWeight')).toBe(
      DEFAULT_VALUE.fontWeight
    );
    expect(wrapper.find('text').prop('fill')).toBe(DEFAULT_VALUE.textColor);
    expect(wrapper.find('text').text()).toBe('');
  });

  it('Check limits X and Y props values', () => {
    const newProps = JSON.parse(JSON.stringify(defaultProps));

    newProps.percent.position = { X: -200, Y: -200 };
    let wrapper = shallow(<BarPercentText {...newProps} />);
    expect(wrapper.find('text').prop('x')).toBe(`${POSITION_RANGE.X.min}%`);
    expect(wrapper.find('text').prop('y')).toBe(`${POSITION_RANGE.Y.min}%`);

    newProps.percent.position = { X: 200, Y: 200 };
    wrapper = shallow(<BarPercentText {...newProps} />);
    expect(wrapper.find('text').prop('x')).toBe(`${POSITION_RANGE.X.max}%`);
    expect(wrapper.find('text').prop('y')).toBe(
      `${POSITION_RANGE.Y.maxCircular}%`
    );

    wrapper.setProps({ semiCircular: true });
    expect(wrapper.find('text').prop('y')).toBe(
      `${2 * POSITION_RANGE.Y.maxSemiCircular}%`
    );
  });

  it('Check limit percentage prop value into [0,100]', () => {
    const newProps = JSON.parse(JSON.stringify(defaultProps));

    newProps.percent.value = -100;
    let wrapper = shallow(<BarPercentText {...newProps} />);
    expect(wrapper.text()).toEqual(`${PORCENTAGE_RANGE.min} %`);

    newProps.percent.value = 200;
    wrapper = shallow(<BarPercentText {...newProps} />);
    expect(wrapper.text()).toEqual(`${PORCENTAGE_RANGE.max} %`);
  });
});
