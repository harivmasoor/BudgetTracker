import React from 'react';
import ExpenseInput from './expenseInput';
import ExpenseList from './expenseList';
import ExpensePieChart from './expensePieChart';

function ExpensesPage() {
  return (
    <div>
      <h2>Your Expenses</h2>
      <ExpenseInput />
      <ExpenseList />
      <ExpensePieChart />
    </div>
  );
}

export default ExpensesPage;
