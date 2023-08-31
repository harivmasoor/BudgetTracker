import React from 'react';
import ExpenseInput from './expenseInput';
import ExpenseList from './expenseList';
import ExpensePieChart from './expensePieChart';

function ExpensesPage() {
  return (
    <div className="expenses-page-container">
      <h2>Your Expenses</h2>
      <ExpenseInput />
      <ExpensePieChart />
      <ExpenseList />
    </div>
  );
}

export default ExpensesPage;
