import React from 'react';
import {shallow} from 'enzyme';
import OrderOption from './OrderOption.js';
import DatePicker from 'react-datepicker';

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
    date: {currentValue: new Date()},
  };

  const testValue = mockProps.values[1].id;
  const testValueNumber = 3;

  for(let type in optionTypes){
    describe(`Component OrderOption with type=${type}`, () => {
      /* test setup */
      let component;
      let subcomponent;
      let renderedSubcomponent;
      let mockSetOrderOption; /* 1 */

      beforeEach(() => {
        mockSetOrderOption = jest.fn(); /* 2 - sposób na stworzenie atrapy funkcji */
        component = shallow(
          <OrderOption
            type={type}
            setOrderOption={mockSetOrderOption} /* 3 */
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
        console.log(component.debug());
        console.log(subcomponent.debug());
      });

      /* type-specific tests */
      switch (type) {
        case 'dropdown': {
          it('contains select and options', () => {
            const select = renderedSubcomponent.find('select');
            expect(select.length).toBe(1);

            /*notes: if required is false(it it set to false in our mockprops),
            then aditional option with empty value is added.
            We are checking:
            1. if select option with empty value is added, then
            2. for one option with each object from mockProps.values
            */

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
        case 'text': {
          it('contains div with input', () => {
            const div = renderedSubcomponent.find('div');
            expect(div.length).toBe(1);
            const input = div.find('input');
            expect(input.length).toBe(1);
            expect(input.prop('type')).toEqual('text');
            expect(input.prop('type')).toEqual('text');
          });

          it('should run setOrderOption function on change', () => {
            renderedSubcomponent.find('input').simulate('change', {currentTarget: {value: testValue}});
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
          });

          break;
        }
        case 'number': {
          it('contains div with input', () => {
            const div = renderedSubcomponent.find('div');
            const input = div.find('input');
            expect(input.prop('value')).toEqual(mockPropsForType.number.currentValue);
            expect(input.prop('min')).toEqual(mockProps.limits.min);
            expect(input.prop('max')).toEqual(mockProps.limits.max);
          });
          it('should run setOrderOption function on change', () => {
            renderedSubcomponent.find('input').simulate('change', {currentTarget: {value: testValueNumber}});
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValueNumber});
          });
          break;
        }
        case 'icons': {
          it('contains div with icon inside', () => {
            const div = renderedSubcomponent.find('div').at(0);
            expect(div.length).toBe(1);

            const emptyIcon = renderedSubcomponent.find('Icon').not('[name="h-square"]').length;
            expect(emptyIcon).toBe(1);

            const firstIconDiv = div.childAt(1);
            const secondIconDiv = div.childAt(2);
            expect(firstIconDiv.length + secondIconDiv.length).toBe(mockProps.values.length);
            expect(firstIconDiv.text()).toEqual(expect.stringContaining(mockProps.values[0].name));
            expect(secondIconDiv.text()).toEqual(expect.stringContaining(mockProps.values[1].name));
          });
          it('should run setOrderOption function on change', () => {
            renderedSubcomponent.find('.icon').last().simulate('click');
            expect(mockSetOrderOption).toBeCalledTimes(1);
          });

          break;
        }
        case 'date': {
          it('contains div with datepicker', () => {
            const datePickerParent = renderedSubcomponent.find('div');
            expect(datePickerParent.childAt(0).prop('selected')).toEqual(mockPropsForType.date.currentValue);
          });
          it('should run setOrderOption function on change', () => {
            renderedSubcomponent.find(DatePicker).simulate('change',  testValue);
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue});
          });

          break;
        }
        case 'checkboxes': {
          it('contains div with inputs inside', () => {
            const div = renderedSubcomponent.find('div');
            expect(div.length).toBe(1);

            const inputs = div.find('input');
            expect(inputs.length).toBe(mockProps.values.length);
            expect(inputs.at(0).prop('type')).toEqual('checkbox');
            expect(inputs.at(1).prop('type')).toEqual('checkbox');

            expect(inputs.at(0).prop('value')).toEqual(mockProps.values[0].id);
            expect(inputs.at(1).prop('value')).toEqual(mockProps.values[1].id);
          });

          it('should run setOrderOption function on change', () => {
            renderedSubcomponent.find({value: testValue}).simulate('change', {currentTarget: {checked: true}});
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: [mockProps.currentValue, testValue] });
          });
          break;
        }
      }
    });
  }


});
