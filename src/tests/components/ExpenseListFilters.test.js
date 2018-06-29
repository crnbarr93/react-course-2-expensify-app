import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, filters2 } from '../fixtures/filters';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  );
});

test('should render ExpenseListFilters correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with alt data correctly', () => {
  wrapper.setProps({
    filters: filters2
  });
  expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
  const value = 'test';
  const event = {
    target: { value }
  };
  wrapper.find('input').prop('onChange')(event);
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('should sort by date', () => {
  const value = 'date';
  const event = {
    target: { value }
  };
  wrapper.find('select').prop('onChange')(event);
  expect(sortByDate).toHaveBeenLastCalledWith();
});

test('should sort by amount', () => {
  const value = 'amount';
  const event = {
    target: { value }
  };
  wrapper.find('select').prop('onChange')(event);
  expect(sortByAmount).toHaveBeenLastCalledWith();
});

test('should handle date changes', () => {
  const startDate = filters2.startDate;
  const endDate = filters2.endDate;
  wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate, endDate });
  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);

});

test('should handle date focus change', () => {
  const calendarFocused = 'endDate';
  wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);
  expect(wrapper.state('calendarFocused')).toEqual(calendarFocused);
});
