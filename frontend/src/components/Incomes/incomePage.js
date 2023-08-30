import React from 'react';
import IncomeInput from './incomeInput';
import IncomeList from './incomeList';
import IncomePieChart from './incomePieChart';

function IncomesPage() {
  return (
    <div>
      <h2>Your Income</h2>
      <IncomeInput />
      <IncomeList />
      {/* <IncomePieChart /> */}
    </div>
  );
}

export default IncomesPage;
