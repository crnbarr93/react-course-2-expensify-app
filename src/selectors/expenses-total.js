const selectExpensesTotal = (expenses) => {
  let total = 0;
  if (expenses.length == 0) {
    return total;
  } else {
    expenses.map((expense) => {
      total += expense.amount;
    });
    return total;
  }
};

export default selectExpensesTotal;
