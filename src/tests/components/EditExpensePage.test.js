import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let editExpenseSaga, removeExpenseSaga, history, wrapper, expense;

beforeEach(() => {
  editExpenseSaga = jest.fn();
  removeExpenseSaga = jest.fn();
  history = { push: jest.fn() };
  expense = expenses[0];
  wrapper = shallow(<EditExpensePage
    editExpenseSaga={editExpenseSaga}
    removeExpenseSaga={removeExpenseSaga}
    history={history}
    expense={expense}
                    />);
});

test('should render EditExpensePage', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle editExpense', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expense);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(editExpenseSaga).toHaveBeenLastCalledWith(expense.id, expense);
});

test('should handle startRemoveExpense', () => {
  const value = expense.id;
  wrapper.find('button').simulate('click');
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(removeExpenseSaga).toHaveBeenLastCalledWith({ id: expense.id });
});
