import React from 'react';

import { shallow } from 'enzyme';

import BarStroke from './index';
import { PORCENTAGE_RANGE, limitPercent } from '../../../helpers';

const stroke = {
  color: 'red',
  width: 10,
};

const percent = {
  value: 70,
};

const defaultProps = {
  semiCircular: false,
  radius: 100,
  stroke,
  percent,
};

describe('<BarStroke />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<BarStroke {...defaultProps} />);

    expect(wrapper).toBeDefined();
    expect(wrapper.prop('stroke')).toEqual(defaultProps.stroke.color);
    expect(wrapper.prop('strokeWidth')).toEqual(defaultProps.stroke.width);
    expect(wrapper.prop('strokeDashoffset')).toEqual(
      -2 *
        Math.PI *
        defaultProps.radius *
        (limitPercent(defaultProps.percent.value) / 100)
    );
    expect(wrapper.prop('strokeDasharray')).toEqual(
      2 * Math.PI * defaultProps.radius
    );
    expect(wrapper.prop('r')).toEqual(defaultProps.radius);
  });

  it('should render semicircular', () => {
    const wrapper = shallow(<BarStroke {...defaultProps} semiCircular />);

    expect(wrapper).toBeDefined();
    expect(wrapper.prop('strokeDashoffset')).toEqual(
      -1 *
        Math.PI *
        defaultProps.radius *
        (limitPercent(defaultProps.percent.value) / 100)
    );
    expect(wrapper.prop('strokeDasharray')).toEqual(
      1 * Math.PI * defaultProps.radius
    );
  });

  it('should render without percent prop', () => {
    const newProps = JSON.parse(JSON.stringify(defaultProps));
    delete newProps.percent;

    const wrapper = shallow(<BarStroke {...newProps} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.prop('strokeDashoffset')).toEqual(
      -2 * Math.PI * defaultProps.radius * (limitPercent(undefined) / 100)
    );
    expect(wrapper.prop('strokeDasharray')).toEqual(
      2 * Math.PI * defaultProps.radius
    );
  });

  it('Check limit percentage prop value into [0,100]', () => {
    const wrapper = shallow(<BarStroke {...defaultProps} />);
    expect(wrapper).toBeDefined();

    wrapper.setProps({ percent: { value: -50 } });
    expect(wrapper.prop('strokeDashoffset')).toEqual(-PORCENTAGE_RANGE.min);

    wrapper.setProps({ percent: { value: 400 } });
    expect(wrapper.prop('strokeDashoffset')).toEqual(
      -2 *
        Math.PI *
        defaultProps.radius *
        (limitPercent(PORCENTAGE_RANGE.max) / 100)
    );
  });

  it('should throw error if no color prop supplied', () => {
    const newProps = JSON.parse(JSON.stringify(defaultProps));
    delete newProps.stroke;

    try {
      shallow(<BarStroke {...newProps} />);
    } catch (error) {
      expect(error).toEqual(
        new Error(
          "Cannot destructure property `color` of 'undefined' or 'null'."
        )
      );
    }
  });
});
