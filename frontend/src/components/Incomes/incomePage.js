import React from 'react';
import IncomeInput from './incomeInput';
import IncomeList from './incomeList';

function IncomesPage() {
  return (
    <div>
      <h2>Your Income</h2>
      <IncomeInput />
      <IncomeList />
      {/* <ExpensePieChart /> */}
    </div>
  );
}

export default IncomesPage;
