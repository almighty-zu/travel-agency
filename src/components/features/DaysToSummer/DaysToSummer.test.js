import React from 'react';
import {shallow} from 'enzyme';
import DaysToSummer from './DaysToSummer.js';

const trueDate = Date;

const mockDate = customDate => class extends Date {
  constructor(...args){
    if(args.length) {
      super(...args);
    } else {
      super(customDate);
    }
    return this;
  }
  static now(){
    return(new Date(customDate)).getTime();
  }
};

describe('DaysToSummer', () => {

  //TDD - test 1: should render correct value
  it('should render correct value', () => {
    global.Date = mockDate(`2020-06-19T11:59:58.135Z`);

    const component = shallow(<DaysToSummer />);

    expect(component.find('div').text()).toEqual('2 days till summer!');

    global.Date = trueDate;
  });

  //TDD - test 2: should render correct value of 1 day till summer, when it's actually one day till summer
  it('should render correct value, when theres 1 day to summer', () => {
    global.Date = mockDate(`2020-06-20T11:59:58.135Z`);

    const component = shallow(<DaysToSummer />);

    expect(component.find('div').text()).toEqual('1 day till summer!');

    global.Date = trueDate;
  });

  //TDD - test 3: should render nothing when it's summer already
  it('should render nothing when its summer', () => {
    global.Date = mockDate(`2020-06-22T11:59:58.135Z`);

    const component = shallow(<DaysToSummer />);

    expect(component).toEqual({});

    global.Date = trueDate;
  });

  //TDD - test 4: should render correct number of days till summer begins
  it('should render correct number of days till summer', () => {
    global.Date = mockDate(`2020-06-11T11:59:58.135Z`);

    const component = shallow(<DaysToSummer />);

    expect(component.find('div').text()).toEqual('10 days till summer!');

    global.Date = trueDate;
  });
});





