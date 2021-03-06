import React from 'react';
import {shallow} from 'enzyme';
import Hero from './Hero';
import HappyHourAd from '../../features/HappyHourAd/HappyHourAd';
import DaysToSummer from '../../features/DaysToSummer/DaysToSummer';

describe('Component Hero', () => {
  it('should render without crashing', () => {
    const component = shallow(<Hero titleText='Lorem ipsum' imageSrc='image.jpg' />);
    expect(component).toBeTruthy();
    //console.log(component.debug());
  });

  it('should throw error without required props', () => {
    expect(() => shallow(<Hero />)).toThrow();
  });

  it('should render correct title and image', () => {
    const expectedTitle = 'Lorem ipsum';
    const expectedImage = 'image.jpg';
    const component = shallow(<Hero titleText={expectedTitle} imageSrc={expectedImage} />);

    const renderedTitle = component.find('.title').text();
    expect(renderedTitle).toEqual(expectedTitle);
    expect(component.find('.image').prop('src')).toEqual(expectedImage);
  });

  it('renders correct classNames', () => {
    const mockVariants = 'small dummy';
    const component = shallow(<Hero titleText='Lorem ipsum' imageSrc='image.jpg' variant={mockVariants} />);
    expect(component.hasClass('component')).toBe(true);
    expect(component.hasClass('small')).toBe(true);
    expect(component.hasClass('dummy')).toBe(true);
  });

  it('should render HappyHourAd', () => {
    const component = shallow(<Hero titleText='Lorem ipsum' imageSrc='image.jpg' />);
    expect(component.find(HappyHourAd).length).toBe(1);
  });

  it('should render DaysToSummer', () => {
    const component = shallow(<Hero titleText='Lorem ipsum' imageSrc='image.jpg' />);
    expect(component.find(DaysToSummer).length).toBe(1);
  });
});
