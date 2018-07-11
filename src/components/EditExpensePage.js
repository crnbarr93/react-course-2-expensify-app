import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { removeExpenseSaga, editExpenseSaga } from '../actions/expenses';

export class EditExpensePage extends React.Component {
  onSubmit =  (expense) => {
    this.props.editExpenseSaga(this.props.expense.id, expense);
    this.props.history.push('/');
  };

  onRemove = (e) => {
    this.props.removeExpenseSaga({ id: this.props.expense.id });
    this.props.history.push('/');
  };

  render()  {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Expense</h1>
          </div>
        </div>
        <div className='content-container'>
          <ExpenseForm
            expense={this.props.expense}
            onSubmit={this.onSubmit}
          />
          <button className='button button--secondary' onClick={this.onRemove}>Remove</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find((expense) => expense.id === props.match.params.id)
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    editExpenseSaga: (id, expense) => dispatch(editExpenseSaga(id, expense)),
    removeExpenseSaga: (data) => dispatch(removeExpenseSaga(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
