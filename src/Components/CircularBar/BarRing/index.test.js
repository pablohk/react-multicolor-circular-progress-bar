import React from 'react';

import { shallow } from 'enzyme';

import BarRing from './index';

const size = {
  radius: 200,
  width: 7,
};

const defaultProps = {
  bgColor: 'red',
  color: 'orange',
  size,
};

describe('<BarRing />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<BarRing {...defaultProps} />);

    expect(wrapper).toBeDefined();
  });

  it('should no render without radius props', () => {
    const newProps = JSON.parse(JSON.stringify(defaultProps));
    delete newProps.size;

    const wrapper = shallow(<BarRing {...newProps} />);

    expect(wrapper).toEqual({});
  });
});
