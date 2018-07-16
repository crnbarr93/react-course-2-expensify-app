import { startAddExpense, startRemoveExpense, startEditExpense, startSetExpenses } from '../../sagas/expenses';
import expenses from '../fixtures/expenses';
import { combineReducers } from 'redux';
import expensesReducer, { expensesReducerDefaultState as defaultState } from '../../reducers/expenses';
import authReducer from '../../reducers/auth';
import configureMockStore from 'redux-mock-store';
import database from '../../firebase/firebase';
import createSagaMiddleware from 'redux-saga';
import { expectSaga, testSaga } from 'redux-saga-test-plan';

test('should add expense to state', () => {
  return expectSaga(startAddExpense, { expense: { ...expenses[0] } })
    .withReducer(expensesReducer, { auth: { uid: 'testID' } })
    .run(2000).then((result) => {
      const state = result.storeState;
      const expense = state[0];
      expect(typeof expense.id).toBe('string');
      expect(expense.description).toBe(expenses[0].description);
      expect(expense.note).toBe(expenses[0].note);
      expect(expense.createdAt).toBe(expenses[0].createdAt);
      expect(expense.amount).toBe(expenses[0].amount);
    });
});

test('should remove expense from state', () => {
  // const reducer = expensesReducer(defaultState, );
  const initialState = {
    auth: { uid: 'testID' },
    expenses: [expenses[0]]
  };

  return expectSaga(startRemoveExpense, { id: expenses[0].id })
    .withReducer(combineReducers({ auth: authReducer, expenses: expensesReducer }), initialState)
    .run(2000).then((result) => {
      const state = result.storeState;
      expect(state.expenses).toEqual([])
    });
});

test('should edit expense in state', () => {
  const initialState = {
    auth: { uid: 'testID' },
    expenses: [expenses[0]]
  };

  const updates = {
    note: 'test note'
  };

  return expectSaga(startEditExpense, { id: expenses[0].id, updates: updates })
    .withReducer(combineReducers({ auth: authReducer, expenses: expensesReducer }), initialState)
    .run(2000).then((result) => {
      const state = result.storeState;
      expect(state.expenses[0].note).toEqual('test note');
    });
});

test('should set expense in state', () => {
  const initialState = {
    auth: { uid: 'testuid' }
  };

  return expectSaga(startSetExpenses)
    .withReducer(combineReducers({ auth: authReducer, expenses: expensesReducer }), initialState)
    .run(2000).then((result) => {
      const state = result.storeState;
      expect(state.expenses).toEqual(expenses);
    });
});

//UNIT TESTS
//TODO
