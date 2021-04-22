import React from 'react';
import {shallow} from 'enzyme';
import HappyHourAd from 'HappyHourAd.js';

describe('component HappyHourAd', () => {
  it('should render without crashing', () => {
    const component = shallow(<HappyHourAd />);
    expect(component).toBeTruthy();
  });

});


