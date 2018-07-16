import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

let addExpenseSaga, history, wrapper;

beforeEach(() => {
  addExpenseSaga = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(<AddExpensePage addExpenseSaga={addExpenseSaga} history={history} />);
});

test('should render AddExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(addExpenseSaga).toHaveBeenLastCalledWith(expenses[0]);
});
