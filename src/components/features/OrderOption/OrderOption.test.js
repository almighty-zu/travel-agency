import React from 'react';
import {shallow} from 'enzyme';
import OrderOption from './OrderOption.js';

describe('Component OrderOption', () => {
  it('Should render without crashing', () => {
    const component = shallow(<OrderOption type='text' name='name' />);
    expect(component).toBeTruthy();
  });

  it('should return empty object if called without required props', () => {
    const component = shallow(<OrderOption />);
    expect(component).toEqual({});
  });

  it('should render prop name in title', () => {
    const name = 'options';
    const title = 'title';
    const type = 'number';
    const component = shallow(<OrderOption type={type} name={name} title={title} />);
    expect(component.find('h3').text()).toEqual(name); /*Consider why title selector didnt worked*/
  });


});
