import { addExpenseSaga, removeExpenseSaga, editExpenseSaga, setExpensesSaga } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import database from '../../firebase/firebase';
import createSagaMiddleware from 'redux-saga';

const uid = 'testuid';
const saga = createSagaMiddleware;
const defaultMockState = { auth: { uid } };
const createMockStore = configureMockStore([saga]);

beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });
  database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});


test('should dispatch add expense saga object', () => {
  const action = addExpenseSaga(expenses[0]);
  expect(action).toEqual({
    type:'ADD_EXPENSE_SAGA',
    expense: {
      ...expenses[0]
    }
  });
});

test('should dispatch remove expense saga object', () => {
  const action = removeExpenseSaga({ id: 1 });
  expect(action).toEqual({
    type:'REMOVE_EXPENSE_SAGA',
    id: 1
  });
});

test('should dispatch edit expense saga object', () => {
  const updates = {
    note: 'test note'
  };
  const action = editExpenseSaga(1, updates);
  expect(action).toEqual({
    type: 'EDIT_EXPENSE_SAGA',
    id: 1,
    updates
  });
});

test('should dispatch set expense saga object', () => {
  const action = setExpensesSaga();
  expect(action).toEqual({
    type: 'SET_EXPENSES_SAGA'
  });
});

// test('should setup remove expense action object', () => {
//   const action = removeExpense({ id: '123abc' });
//   expect(action).toEqual({
//     type: 'REMOVE_EXPENSE',
//     id: '123abc'
//   });
// });
//
// test('should remove expense from firebase', (done) => {
//   const store = createMockStore(defaultMockState);
//   const id = expenses[2].id;
//   store.dispatch(startRemoveExpense({ id })).then(() => {
//     const actions = store.getActions();
//     expect(actions[0]).toEqual({
//       type: 'REMOVE_EXPENSE',
//       id
//     });
//     return database.ref(`users/${uid}/expenses/${id}`).once('value');
//   }).then((snapshot) => {
//     expect(snapshot.val()).toBeFalsy();
//     done();
//   });
// });
//
// test('should setup edit expense action object', () => {
//   const action = editExpense('123abc', { description: 'test' });
//   expect(action).toEqual({
//     type: 'EDIT_EXPENSE',
//     id: '123abc',
//     updates: {
//       description: 'test'
//     }
//   });
// });
//
// test('should edit expense in firebase', (done) => {
//   const store = createMockStore(defaultMockState);
//   const id = expenses[2].id;
//   const updates = {
//     note: 'added note'
//   };
//   store.dispatch(startEditExpense(id, updates)).then(() => {
//       const actions = store.getActions();
//       expect(actions[0]).toEqual({
//         type: 'EDIT_EXPENSE',
//         id,
//         updates
//       });
//       return database.ref(`users/${uid}/expenses/${id}`).once('value')
//   }).then((snapshot) => {
//     expect(snapshot.val()).toEqual({
//       description: expenses[2].description,
//       amount: expenses[2].amount,
//       createdAt: expenses[2].createdAt,
//       note: updates.note
//     });
//     done();
//   });
// });
//
// test('should setup add expense action object with provided values', () => {
//   const action = addExpense(expenses[2]);
//   expect(action).toEqual({
//     type: 'ADD_EXPENSE',
//     expense: expenses[2]
//   })
// });
//
// test('should add expense to database and store', (done) => {
//   const store = createMockStore(defaultMockState);
//   const expenseData = {
//     description: 'Mouse',
//     amount: 3000,
//     note: 'This one is better',
//     createdAt: 1000
//   };
//
//   store.dispatch(startAddExpense(expenseData)).then(() => {
//     const actions = store.getActions();
//     expect(actions[0]).toEqual({
//       type: 'ADD_EXPENSE',
//       expense: {
//         id: expect.any(String),
//         ...expenseData
//       }
//     });
//
//     return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
//   }).then((snapshot) => {
//     expect(snapshot.val()).toEqual(expenseData);
//     done();
//   });
// });
//
// test('should add expense with defaults to database and store', (done) => {
//   const store = createMockStore(defaultMockState);
//
//   store.dispatch(startAddExpense({})).then(() => {
//     const actions = store.getActions();
//     expect(actions[0]).toEqual({
//       type: 'ADD_EXPENSE',
//       expense: {
//         id: expect.any(String),
//         description: '',
//         amount: 0,
//         note: '',
//         createdAt: 0
//       }
//     });
//
//     return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
//   }).then((snapshot) => {
//     expect(snapshot.val()).toEqual({
//       description: '',
//       amount: 0,
//       note: '',
//       createdAt: 0
//     });
//     done();
//   });
// });
//
// test('should setup set expense action object with data', () => {
//   const action = setExpenses(expenses);
//   expect(action).toEqual({
//     type: 'SET_EXPENSES',
//     expenses
//   });
// });
//
// test('should fetch the expenses from firebase', (done) => {
//   const store = createMockStore(defaultMockState);
//   store.dispatch(startSetExpenses()).then(() => {
//     const actions = store.getActions();
//     expect(actions[0]).toEqual({
//       type: 'SET_EXPENSES',
//       expenses
//     });
//     done();
//   });
// });
