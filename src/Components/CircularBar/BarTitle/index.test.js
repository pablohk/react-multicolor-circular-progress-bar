import React from 'react';
import { shallow } from 'enzyme';

import BarTitle from './index';
import { DEFAULT_VALUE, POSITION_RANGE } from '../../../helpers';

describe('<BarTitle />', () => {
  const title = {
    name: 'fakeName',
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
    fontFamily: 'roboto',
    title,
  };

  it('should render correctly', () => {
    const wrapper = shallow(<BarTitle {...defaultProps} />);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('text').prop('transform')).toBe('');
    expect(wrapper.find('text').prop('x')).toBe(
      `${defaultProps.title.position.X}%`
    );
    expect(wrapper.find('text').prop('y')).toBe(
      `${defaultProps.title.position.Y}%`
    );
    expect(wrapper.find('text').prop('textAnchor')).toBe(
      defaultProps.title.align
    );
    expect(wrapper.find('text').prop('dominantBaseline')).toBe(
      defaultProps.title.align
    );
    expect(wrapper.find('text').prop('fontSize')).toBe(
      defaultProps.title.fontSize
    );
    expect(wrapper.find('text').prop('fontWeight')).toBe(
      defaultProps.title.fontWeight
    );
    expect(wrapper.find('text').prop('fill')).toBe(defaultProps.title.color);
    expect(wrapper.find('text').text()).toBe(defaultProps.title.name);
  });

  it('should render with semicircular active', () => {
    const wrapper = shallow(<BarTitle {...defaultProps} semiCircular />);
    expect(wrapper.find('text').prop('transform')).toBe('rotate(90)');
    expect(wrapper.find('text').prop('y')).toBe(
      `${2 * defaultProps.title.position.Y}%`
    );
  });

  it('should render without "title" prop', () => {
    const newProps = JSON.parse(JSON.stringify(defaultProps));
    delete newProps.title;

    const wrapper = shallow(<BarTitle {...newProps} />);

    expect(wrapper.find('text').prop('x')).toBe(`${DEFAULT_VALUE.X}%`);
    expect(wrapper.find('text').prop('y')).toBe(`${DEFAULT_VALUE.Y}%`);
    expect(wrapper.find('text').prop('textAnchor')).toBeUndefined();
    expect(wrapper.find('text').prop('dominantBaseline')).toBeUndefined();
    expect(wrapper.find('text').prop('fontSize')).toBe(DEFAULT_VALUE.fontSize);
    expect(wrapper.find('text').prop('fontWeight')).toBe(
      DEFAULT_VALUE.fontWeight
    );
    expect(wrapper.find('text').prop('fill')).toBe(DEFAULT_VALUE.textColor);
    expect(wrapper.find('text').text()).toBe('');
  });

  it('Check limits X and Y props values', () => {
    const newProps = JSON.parse(JSON.stringify(defaultProps));

    newProps.title.position = { X: -200, Y: -200 };
    let wrapper = shallow(<BarTitle {...newProps} />);
    expect(wrapper.find('text').prop('x')).toBe(`${POSITION_RANGE.X.min}%`);
    expect(wrapper.find('text').prop('y')).toBe(`${POSITION_RANGE.Y.min}%`);

    newProps.title.position = { X: 200, Y: 200 };
    wrapper = shallow(<BarTitle {...newProps} />);
    expect(wrapper.find('text').prop('x')).toBe(`${POSITION_RANGE.X.max}%`);
    expect(wrapper.find('text').prop('y')).toBe(
      `${POSITION_RANGE.Y.maxCircular}%`
    );

    wrapper.setProps({ semiCircular: true });
    expect(wrapper.find('text').prop('y')).toBe(
      `${2 * POSITION_RANGE.Y.maxSemiCircular}%`
    );
  });
});
