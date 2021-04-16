import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {

  it('should render correct link', () => {
    const expectedId = 'abc';
    const component = shallow(<TripSummary id={expectedId} image='image.jpg' name='trip' cost='123' days={3} tags={['']} />);

    const renderedLink = component.find('.link').prop('to');
    expect(renderedLink).toEqual('/trip/' + expectedId);
  });

  it('if img has correct src and alt', () => {
    const expectedId = 'abc';
    const expectedImage = 'image.jpg';
    const name = 'trip';
    const component = shallow(<TripSummary id={expectedId} image={expectedImage} name={name} cost='123' days={3} tags={['']} />);
    expect(component.find('img').prop('src')).toEqual(expectedImage);
    expect(component.find('img').prop('alt')).toEqual(name);
  });

  it('should render correctly props: name, cost, days', () => {
    const expectedId = 'abc';
    const image = 'image.jpg';
    const name = 'trip';
    const cost = '123';
    const days = 3;

    const component = shallow(<TripSummary id={expectedId} image={image} name={name} cost={cost} days={days} tags={['']} />);

    expect(component.find('.title').text()).toEqual(name);
    expect(component.find('span').at(0).text()).toEqual(days + ' days');
    expect(component.find('span').at(1).text()).toEqual('from ' + cost);
    console.log(component.debug());
  });

  it('should render without crashing', () => {
    const component = shallow(<TripSummary id='abc' image='image.jpg' name='trip' cost='123' days={3} tags={['first', 'second', 'third', 'fourth']} />);
    expect(component).toBeTruthy();
  });

  it('should throw error without required props', () => {
    expect(() => shallow(<TripSummary />)).toThrow();
  });


});
