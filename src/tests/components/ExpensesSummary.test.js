import { ExpensesSummary } from '../../components/ExpensesSummary';
import React from 'react';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';

test('should render ExpensesSummary correctly', () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={3} expensesTotal={100}/>);
  expect(wrapper).toMatchSnapshot();
});
