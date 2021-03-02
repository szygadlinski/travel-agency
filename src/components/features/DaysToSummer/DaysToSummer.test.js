import React from 'react';
import {shallow} from 'enzyme';
import DaysToSummer from './DaysToSummer';

describe('Component DaysToSummer', () => {
  it('should render without crashing', () => {
    const component = shallow(<DaysToSummer />);
    expect(component).toBeTruthy();
  });

  it('should contain div with class daysAmount', () => {
    const component = shallow(<DaysToSummer />);
    expect(component.exists('.component')).toBe(true);
  });
});

const trueDate = Date;

const mockDate = customDate => class extends Date {
  constructor(...args) {
    if(args.length){
      super(...args);
    } else {
      super(customDate);
    }
    return this;
  }
};

const checkMessageAtDate = (date, expectedMessage) => {
  it(`should show correct message at ${date}`, () => {
    global.Date = mockDate(`${date}T23:59:59.999Z`);

    const component = shallow(<DaysToSummer props />);
    const renderedMessage = component.find('.component').text();
    expect(renderedMessage).toEqual(`${expectedMessage}`);

    global.Date = trueDate;
  });
};

describe('Component DaysToSummer with mocked Date', () => {
  checkMessageAtDate('2025-05-28', '24 days to summer!');
  checkMessageAtDate('2022-06-19', '2 days to summer!');
  checkMessageAtDate('2021-09-24', '270 days to summer!');
});

describe('Component DaysToSummer with mocked Date', () => {
  checkMessageAtDate('2025-07-27', '');
  checkMessageAtDate('2022-06-21', '');
  checkMessageAtDate('2021-09-23', '');
});

describe('Component DaysToSummer with mocked Date', () => {
  checkMessageAtDate('2023-06-20', '1 day to summer!');
});
