import React, { useState } from 'react';

const UserMainForm = () => {
  const [fullName, setFullName] = useState('');
  const [income, setIncome] = useState('');
  const [fixedExpenses, setFixedExpenses] = useState('');
  const [variableExpenses, setVariableExpenses] = useState('');
  const [upcomingExpenses, setUpcomingExpenses] = useState('');
  const [debts, setDebts] = useState('');
  const [debtPayments, setDebtPayments] = useState('');
  const [notificationFrequency, setNotificationFrequency] = useState('daily');
  const [expenseTracking, setExpenseTracking] = useState('automatic');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle the form submission, e.g., sending the data to a server or processing it further.
    // console.log({
    //   fullName,
    //   income,
    //   fixedExpenses,
    //   variableExpenses,
    //   upcomingExpenses,
    //   debts,
    //   debtPayments,
    //   notificationFrequency,
    //   expenseTracking,
    // });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="fullName">What's your name? (full name)</label>
        <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="income">What's your average monthly income? (USD)</label>
        <input type="number" id="income" value={income} onChange={(e) => setIncome(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="fixedExpenses">What are your fixed monthly expenses? (e.g., rent, mortgage, utilities, insurance)</label>
        <input type="number" id="fixedExpenses" value={fixedExpenses} onChange={(e) => setFixedExpenses(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="variableExpenses">What are some of your variable expenses? (e.g., groceries, dining out, entertainment)</label>
        <input type="number" id="variableExpenses" value={variableExpenses} onChange={(e) => setVariableExpenses(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="upcomingExpenses">Do you have any large or irregular expenses coming up?</label>
        <input type="number" id="upcomingExpenses" value={upcomingExpenses} onChange={(e) => setUpcomingExpenses(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="debts">Do you have any outstanding debts?</label>
        <input type="number" id="debts" value={debts} onChange={(e) => setDebts(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="debtPayments">What are your monthly debt payments?</label>
        <input type="number" id="debtPayments" value={debtPayments} onChange={(e) => setDebtPayments(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="notificationFrequency">How often would you like to be notified about your budget?</label>
        <select id="notificationFrequency" value={notificationFrequency} onChange={(e) => setNotificationFrequency(e.target.value)}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      <div>
        <label htmlFor="expenseTracking">Would you like to set up automatic expense tracking or manual entry?</label>
        <select id="expenseTracking" value={expenseTracking} onChange={(e) => setExpenseTracking(e.target.value)}>
          <option value="automatic">Automatic</option>
          <option value="manual">Manual</option>
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserMainForm;
