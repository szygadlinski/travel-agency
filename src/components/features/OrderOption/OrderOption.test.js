import React from 'react';
import {shallow} from 'enzyme';
import OrderOption from './OrderOption';

describe('Component OrderOption', () => {
  it('should render correctly', () => {
    const component = shallow(<OrderOption name='name' type='type' />);
    expect(component).toBeTruthy();
  });

  it('should return empty object if prop type is unrecognized', () => {
    const component = shallow(<OrderOption name='name' type='type' />);
    expect(component).toEqual({});
  });

  it('should render correct title', () => {
    const expectedName = 'name';
    const component = shallow(<OrderOption name={expectedName} type='text' />);
    expect(component.find('.title').text()).toBe(expectedName);
  });
});

const optionTypes = {
  dropdown: 'OrderOptionDropdown',
  icons: 'OrderOptionIcons',
  checkboxes: 'OrderOptionCheckboxes',
  number: 'OrderOptionNumber',
  text: 'OrderOptionText',
  date: 'OrderOptionDate',
};

const mockProps = {
  id: 'abc',
  name: 'Lorem',
  values: [
    {id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0},
    {id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100},
  ],
  required: false,
  currentValue: 'aaa',
  price: '50%',
  limits: {
    min: 0,
    max: 6,
  },
};

const mockPropsForType = {
  dropdown: {},
  icons: {},
  checkboxes: {currentValue: [mockProps.currentValue]},
  number: {currentValue: 1},
  text: {},
  date: {},
};

const testValue = mockProps.values[1].id;
const testValueNumber = 3;

for(let type in optionTypes){
  describe(`Component OrderOption with type="${type}"`, () => {

    /* test setup */

    let component;
    let subcomponent;
    let renderedSubcomponent;
    let mockSetOrderOption;

    beforeEach(() => {
      mockSetOrderOption = jest.fn();
      component = shallow(
        <OrderOption
          type={type}
          setOrderOption={mockSetOrderOption}
          {...mockProps}
          {...mockPropsForType[type]}
        />
      );
      subcomponent = component.find(optionTypes[type]);
      renderedSubcomponent = subcomponent.dive();
    });

    /* common tests */

    it(`renders ${optionTypes[type]}`, () => {
      expect(subcomponent).toBeTruthy();
      expect(subcomponent.length).toBe(1);
    });

    /* type-specific tests */

    switch (type) {
      case 'dropdown': {

        it('contains select and options', () => {
          const select = renderedSubcomponent.find('select');
          expect(select.length).toBe(1);

          const emptyOption = select.find('option[value=""]').length;
          expect(emptyOption).toBe(1);

          const options = select.find('option').not('[value=""]');
          expect(options.length).toBe(mockProps.values.length);
          expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('select').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });

        break;
      }

      case 'icons': {

        it('should render appropriate divs', () => {
          const parentDiv = renderedSubcomponent.find('.component');
          expect(parentDiv.length).toBe(1);

          const emptyChildDiv = parentDiv.find('.icon').find('Icon[name="times-circle"]');
          expect(emptyChildDiv.length).toBe(1);

          const childDiv = parentDiv.findWhere(n => n.key());
          expect(childDiv.length).toBe(mockProps.values.length);
          expect(childDiv.at(0).key()).toBe(mockProps.values[0].id);
          expect(childDiv.at(1).key()).toBe(mockProps.values[1].id);
        });

        it('should run setOrderOption function on click', () => {
          renderedSubcomponent.find('.component').find('.icon').last().simulate('click');
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });

        break;
      }

      case 'checkboxes': {

        it('should render div and inputs', () => {
          const div = renderedSubcomponent.find('.checkboxes');
          expect(div.length).toBe(1);

          const inputs = div.find('input');
          expect(inputs.length).toBe(mockProps.values.length);
          expect(inputs.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(inputs.at(1).prop('value')).toBe(mockProps.values[1].id);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find(`input[value="${testValue}"]`).simulate('change', {currentTarget: {checked: true}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: [mockProps.currentValue, testValue] });
        });

        break;
      }

      case 'number': {

        it('should render div and input', () => {
          const div = renderedSubcomponent.find('.number');
          expect(div.length).toBe(1);

          const input = div.find('.input');
          expect(input.length).toBe(1);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('.input').simulate('change', {currentTarget: {value: testValueNumber}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValueNumber });
        });

        break;
      }

      case 'text': {

        it('should render div and input', () => {
          const div = renderedSubcomponent.find('div');
          expect(div.length).toBe(1);

          const input = div.find('.input');
          expect(input.length).toBe(1);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('.input').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });

        break;
      }

      case 'date': {

        it('should render div and DatePicker', () => {
          const div = renderedSubcomponent.find('div');
          expect(div.length).toBe(1);

          const datePicker = div.find('.input');
          expect(datePicker.length).toBe(1);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('.input').simulate('change', testValue);
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });

        break;
      }
    }
  });
}
