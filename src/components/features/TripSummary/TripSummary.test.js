import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {

  it('should render correct link', () => {
    const expectedId = 'abc';
    const component = shallow(<TripSummary id={expectedId} image='image.jpg' name='trip' cost='123' days={3} tags={['']} />);

    const renderedLink = component.find('.link').prop('to');
    expect(renderedLink).toEqual('/trip/' + expectedId);
    console.log(component.debug());
  });

  it('if img has correct src and alt', () => {
    const expectedId = 'abc';
    const expectedImage = 'image.jpg';
    const name = 'trip';
    const component = shallow(<TripSummary id={expectedId} image={expectedImage} name={name} cost='123' days={3} tags={['']} />);
    expect(component.find('img').prop('src')).toEqual(expectedImage);
    expect(component.find('img').prop('alt')).toEqual(name);
  });
});
