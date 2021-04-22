import React from 'react';
import {shallow} from 'enzyme';
import HappyHourAd from './HappyHourAd.js';

const select = {
  title: '.title',
  promoDescription: '.promoDescription',
};

describe('component HappyHourAd', () => {
  it('should render without crashing', () => {
    const component = shallow(<HappyHourAd />);
    expect(component).toBeTruthy();
  });

  it('should render heading and description', () => {
    const component = shallow(<HappyHourAd />);
    expect(component.exists(select.title)).toEqual(true);
    expect(component.exists(select.promoDescription)).toEqual(true);
  });

});


