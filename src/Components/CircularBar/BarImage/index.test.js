import React from 'react';

import { shallow } from 'enzyme';

import BarImage from './index';
import { DEFAULT_VALUE, POSITION_RANGE } from '../../../helpers';

describe('<BarImage />', () => {
  const image = {
    path: '',
    width: 30,
    position: {
      X: 10,
      Y: -10,
    },
  };

  const defaultProps = {
    semiCircular: false,
    scale: 1,
    image,
  };

  it('should render correctly', () => {
    const component = shallow(<BarImage {...defaultProps} />);

    expect(component).toBeDefined();
    expect(component.find('image').prop('transform')).toBe('');
    expect(component.find('image').prop('x')).toBe(
      `${image.position.X - image.width / 2}%`
    );
    expect(component.find('image').prop('y')).toBe(
      `${image.position.Y - image.width / 2}%`
    );
    expect(component.find('image').prop('width')).toBe(image.width);
    expect(component.find('image').prop('href')).toBe(image.path);
  });

  it('should render with semicircular active', () => {
    const component = shallow(<BarImage {...defaultProps} semiCircular />);

    expect(component.find('image').prop('y')).toBe(
      `${2 * image.position.Y - image.width}%`
    );
    expect(component.find('image').prop('transform')).toBe('rotate(90)');

    component.setProps({ image: undefined });
    expect(component.find('image').prop('y')).toBe(
      `${2 * DEFAULT_VALUE.Y - DEFAULT_VALUE.width}%`
    );
  });

  it('should render without "image" prop', () => {
    const newProps = JSON.parse(JSON.stringify(defaultProps));
    delete newProps.image;

    const component = shallow(<BarImage {...newProps} />);

    expect(component.find('image').prop('x')).toBe(
      `${DEFAULT_VALUE.X - DEFAULT_VALUE.width / 2}%`
    );
    expect(component.find('image').prop('y')).toBe(
      `${DEFAULT_VALUE.Y - DEFAULT_VALUE.width / 2}%`
    );
    expect(component.find('image').prop('width')).toBe(DEFAULT_VALUE.width);
    expect(component.find('image').prop('xlinkHref')).toBeUndefined();
  });

  it('Check limits X and Y props values', () => {
    const newProps = JSON.parse(JSON.stringify(defaultProps));

    newProps.image.position = { X: -200, Y: -200 };
    let wrapper = shallow(<BarImage {...newProps} />);
    expect(wrapper.find('image').prop('x')).toBe(
      `${POSITION_RANGE.X.min - image.width / 2}%`
    );
    expect(wrapper.find('image').prop('y')).toBe(
      `${POSITION_RANGE.Y.min - image.width / 2}%`
    );

    newProps.image.position = { X: 200, Y: 200 };
    wrapper = shallow(<BarImage {...newProps} />);
    expect(wrapper.find('image').prop('x')).toBe(
      `${POSITION_RANGE.X.max - image.width / 2}%`
    );
    expect(wrapper.find('image').prop('y')).toBe(
      `${POSITION_RANGE.Y.maxCircular - image.width / 2}%`
    );

    wrapper.setProps({ semiCircular: true });
    expect(wrapper.find('image').prop('y')).toBe(
      `${2 * POSITION_RANGE.Y.maxSemiCircular - image.width}%`
    );
  });
});
