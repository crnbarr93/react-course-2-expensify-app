import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects';
import uuid from 'uuid';
import database from '../firebase/firebase';
import { getState, getUid } from '../selectors/expenses';
import AppRouter, { history } from '../routers/AppRouter';

//ADD_EXPENSE
const addExpense = (expense) => ({
  type:'ADD_EXPENSE',
  expense
});

export function* startAddExpense(action) {
    const uid = yield select(getUid);
    const expenseData = action.expense;
    const expense = {
      description: expenseData.description,
      note: expenseData.note,
      amount: expenseData.amount,
      createdAt: expenseData.createdAt
    };

    const result = yield call((_uid, _expense) => {
      return database.ref(`users/${_uid}/expenses`).push(_expense).then((ref) => {
          return {
            id: ref.key,
            ..._expense
          }
        });
    }, uid, expense);
    yield put(addExpense(result));
};

function* addExpenseSaga() {
  yield takeEvery('ADD_EXPENSE_SAGA', startAddExpense)
};

const removeExpense = ({ id }) => ({
  type: 'REMOVE_EXPENSE',
  id
});

export function* startRemoveExpense({ id } = {}) {
  const uid = yield select(getUid);

  yield call((_uid, _id) => {
    return database.ref(`users/${_uid}/expenses/${_id}`).remove().then((snapshot) => {
      return true;
    });
  }, uid, id);

  yield put(removeExpense({ id }));
}

function* removeExpenseSaga() {
  yield takeEvery('REMOVE_EXPENSE_SAGA', startRemoveExpense)
};

//EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

export function* startEditExpense(action) {
  const uid = yield select(getUid);
  const result = yield call((_uid, _id, _updates) => {
    return database.ref(`users/${_uid}/expenses/${_id}`).update(_updates).then((snapshot) => {
      return true;
    })
  }, uid, action.id, action.updates);

  yield put(editExpense(action.id, action.updates));
};

function* editExpenseSaga() {
  yield takeEvery('EDIT_EXPENSE_SAGA', startEditExpense);
};

//SET_EXPENSES
export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
});

export function* startSetExpenses() {
  const uid = yield select(getUid);

  const result = yield call((_uid) => {
    return database.ref(`users/${_uid}/expenses`).once('value').then((snapshot) => {
      const expenses = [];

      snapshot.forEach((expense) => {
          expenses.push({
            id: expense.key,
            ...expense.val()
          })
      });
      return expenses;
    });
  }, uid);

  yield put(setExpenses(result));
  if (history.location.pathname === '/') {
    history.push('/dashboard');
  };
}

function* setExpensesSaga() {
  yield takeEvery('SET_EXPENSES_SAGA', startSetExpenses);
};

//ROOT SAGA
function* expenseSaga() {
  yield [
    addExpenseSaga(),
    editExpenseSaga(),
    removeExpenseSaga(),
    setExpensesSaga()
  ];
}

export default expenseSaga;
