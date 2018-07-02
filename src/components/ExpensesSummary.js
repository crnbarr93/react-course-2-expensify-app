import React from 'react';
import selectExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';

export default (props) => (
  <div>
    <p>{props.expenses.length}</p>
    <p>{numeral(selectExpensesTotal(props.expenses)/100).format('$0,0.00')}</p>
  </div>
);
