import filtersReducer from '../../reducers/filters';
import moment from 'moment';

test('should set up default filter values', () => {
  const state = filtersReducer(undefined, { type:'@@INIT' });
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

test('should set by sortBy to date', () => {
  const currentState = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  }
  const action = { type: 'SORT_BY_DATE' };
  const state = filtersReducer(currentState, action);
  expect(state.sortBy).toBe('date');
});

test('should set by sortBy to amount', () => {
  const state = filtersReducer(undefined, { type:'SORT_BY_AMOUNT' });
  expect(state.sortBy).toBe('amount');
});

test('should set text filter', () => {
  const state = filtersReducer(undefined, { type:'SET_TEXT_FILTER', text: 'test' });
  expect(state.text).toBe('test');
});

test('should set start date', () => {
  const state = filtersReducer(undefined, { type:'SET_START_DATE', date: 100 });
  expect(state.startDate).toBe(100);
});

test('should set end date', () => {
  const state = filtersReducer(undefined, { type:'SET_END_DATE', date: -100 });
  expect(state.endDate).toBe(-100);
});
