import React from 'react';
import IncomeInput from './incomeInput';
import IncomeList from './incomeList';
import IncomePieChart from './incomePieChart';
import './Income.css';

function IncomesPage() {
  return (
    <div className="incomes-page-container">
      <h2>Your Income</h2>
      <IncomeInput />
      <IncomePieChart />
      <IncomeList />
    </div>
  );
}

export default IncomesPage;
