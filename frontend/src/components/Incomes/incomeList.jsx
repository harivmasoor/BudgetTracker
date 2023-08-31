import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchIncomes ,deletedIncome} from '../../store/incomes';
import { fetchIncomeCategories } from '../../store/incomeCategories';
import React from 'react';
import './Income.css';
import { formattedDate } from '../../Util/dateUtil';
import { fetchExpenses } from '../../store/expenses';

function IncomeList() {
  const incomes = useSelector(state => state.incomes.income);
  const incomeCategories = useSelector(state => state.incomeCategories);
  const dispatch = useDispatch();
  const expenses = useSelector(state => state.expenses);
  const [timeFrame, setTimeFrame] = useState("all"); // default to 'all'

  useEffect(() => {
    dispatch(fetchIncomeCategories());
  }, []);

  useEffect(() => {
    let startDate, endDate;
    const today = new Date();
    endDate = today.toISOString().split('T')[0]; // current date

    switch (timeFrame) {
      case 'daily':
        startDate = today.toISOString().split('T')[0];
        break;
      case 'weekly':
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7);
        startDate = lastWeek.toISOString().split('T')[0];
        break;
      case 'monthly':
        const lastMonth = new Date(today);
        lastMonth.setMonth(today.getMonth() - 1);
        startDate = lastMonth.toISOString().split('T')[0];
        break;
      default:
        startDate = undefined;
        endDate = undefined;
    }
    // console.log(startDate, endDate)
    dispatch(fetchExpenses(startDate, endDate));
    dispatch(fetchIncomes(startDate, endDate));

  }, [dispatch, timeFrame]);

  const handleDeleteIncome = (incomeId) => {
    dispatch(deletedIncome(incomeId));
  };
  const handleTimeFrameChange = (e) => {
    setTimeFrame(e.target.value);
  };

  const countSaving = (expenses, incomes) => {
    let totalEx = 0;
    let totalIn = 0;
    
    if (expenses)
      totalEx = expenses.reduce((accumulator, expense) => accumulator + expense.variableExpenses, 0);
  
    if (incomes)
      totalIn = incomes.reduce((accumulator, income) => accumulator + income.incomeamount, 0);
  
    // Calculate savings
    const savings = totalIn - totalEx;
  
    return {savings:savings,totalIn:totalIn,totalEx:totalEx};
  };
const {savings,totalIn,totalEx}=countSaving(expenses, incomes);
  return (
    <div>
      <div id='stt'>
        <label htmlFor=""></label>
        <div>Saving: ${savings}</div>
        <div>Total Income: ${totalIn} </div>
        <div>Total Expenses: ${totalEx} </div>
      </div>
      <div className='incomes-page-container'>
      <label htmlFor="timeFrame">Select Time Frame: </label>
      <select id="timeFrame" value={timeFrame} onChange={handleTimeFrameChange}>
        <option value="all">All</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
      <hr />
      {incomes && incomes.map(income => (
        <div key={income._id}>
          <p><strong>Income Source:</strong> {income.incomesource}</p>
          <p><strong>Income Amount:</strong> ${income.incomeamount}</p>
          <p><strong>Notes:</strong> {income.notes}</p>
          <p><strong>Category:</strong> 
          {income.category ? incomeCategories.filter(category => 
            category._id === income.category).map(filteredCategory => filteredCategory.name) : 'N/A'}
          </p>
          <p><strong>Date:</strong> {formattedDate(income.date)}</p>
          <button onClick={() => handleDeleteIncome(income._id)}>Delete</button>
          <hr />
          </div>
      ))}
      </div>
    </div>
  );
}

export default IncomeList;
