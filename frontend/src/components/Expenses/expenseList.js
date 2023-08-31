import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchExpenses } from '../../store/expenses';

function ExpenseList() {
  const categories = useSelector(state => state.categories);
  const dispatch = useDispatch();
  const expenses = useSelector(state => state.expenses);
  const [timeFrame, setTimeFrame] = useState("all"); // default to 'all'

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

  }, [dispatch, timeFrame]);

  const handleTimeFrameChange = (e) => {
    setTimeFrame(e.target.value);
  };

  if (!categories) return null;
  return (
    <div>
      <label htmlFor="timeFrame">Select Time Frame: </label>
      <select id="timeFrame" value={timeFrame} onChange={handleTimeFrameChange}>
        <option value="all">All</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
      <hr />
      {expenses.map(expense => (
        <div key={expense._id}>
          <p><strong>Variable Expense:</strong> ${expense.variableExpenses}</p>
          <p><strong>Date:</strong> {expense.date.split('T')[0]}</p>
          <p><strong>Notes:</strong> {expense.notes}</p>
          <div>Category: {categories.filter(category => category._id === expense.category).map(filteredCategory => filteredCategory.name)}</div>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;

