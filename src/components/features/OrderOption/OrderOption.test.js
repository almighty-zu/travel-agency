import React from 'react';
import {shallow} from 'enzyme';
import OrderOption from 'OrderOption.js';

describe('Component OrderOption', () => {
  it('Should render without crashing', () => {
    const component = shallow(<OrderOption type='text' name='name' />);
    expect(component).toBeTruthy();
    console.log(component.debug());
  });
});
