import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {
  it('should generate correct link', () => {
    const expectedLink = '/trips/abc';
    const component = shallow(<TripSummary id='abc' />);
    expect(component.find('.link').prop('to')).toEqual(expectedLink);
  });

  it('should render correct img props', () => {
    const expectedSrc = 'image.jpg';
    const expectedAlt = 'image';
    const component = shallow(<TripSummary image={expectedSrc} name={expectedAlt} id='abc' />);
    expect(component.find('img').prop('src')).toEqual(expectedSrc);
    expect(component.find('img').prop('alt')).toEqual(expectedAlt);
  });

  it('should render correct props: name, cost and days', () => {
    const expectedName = 'trip';
    const expectedCost = '$666';
    const expectedDays = 7;
    const component = shallow(<TripSummary name={expectedName} cost={expectedCost} days={expectedDays} id='abc' />);
    expect(component.find('.title').text()).toEqual(expectedName);
    expect(component.find('.details').childAt(1).text()).toEqual('from ' + expectedCost);
    expect(component.find('.details').childAt(0).text()).toEqual(expectedDays + ' days');
  });

  it('should throw an error without required props', () => {
    expect(() => shallow(<TripSummary />)).toThrow();
  });

  it('should render tags in correct order', () => {
    const expectedTags = ['abc', 'xyz', 'qwerty'];
    const component = shallow(<TripSummary tags={expectedTags} />);
    expect(component.find('.tag').at(0).text()).toBe('abc');
    expect(component.find('.tag').at(1).text()).toBe('xyz');
    expect(component.find('.tag').at(2).text()).toBe('qwerty');
  });

  it('should not render div .tags without prop tags or with prop tags = []', () => {
    expect(shallow(<TripSummary />).find('.tags')).toEqual({});
    expect(shallow(<TripSummary tags={[]} />).find('.tags')).toEqual({});
  });
});
