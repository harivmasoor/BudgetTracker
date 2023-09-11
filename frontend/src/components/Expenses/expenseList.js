import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchExpenses ,deleteExpense, updateExpense} from '../../store/expenses';
import './Expenses.css';
import { formattedDate } from '../../Util/dateUtil';
import { fetchCategories } from '../../store/categories';
import CategoryIcons from './categoryIcons';


function ExpenseList({setIsLoading}) {
  const categories = useSelector(state => state.categories);
  const dispatch = useDispatch();
  const expenses = useSelector(state => state.expenses);
  const [timeFrame, setTimeFrame] = useState("all"); // default to 'all'
  const [isEditing, setIsEditing] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);


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
    const fn = async () => {
      await dispatch(fetchExpenses(startDate, endDate));
      await dispatch(fetchCategories());
      setIsLoading(false);
    }
    fn();

  }, [dispatch, timeFrame]);

  const handleDeleteExpense = (expense) => {
    dispatch(deleteExpense(expense));
  };

  const handleTimeFrameChange = (e) => {
    setTimeFrame(e.target.value);
  };

  const handleEditExpense = (expense) => {
    setIsEditing(true);
    setCurrentExpense(expense);
  };

  const handleUpdateExpense = async (e) => {
    e.preventDefault();
    const updatedData = {
      notes: e.target.notes.value,
    };
    await dispatch(updateExpense(currentExpense._id, updatedData));
    setIsEditing(false);
    setCurrentExpense(null);
};


  if (!categories) return null;
  return (
    <div className="expenses-page-container">
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
          <p><strong>${expense.variableExpenses}</strong></p>
          <p><strong>Date:</strong> {formattedDate(expense.date)}</p>
          <p><strong>Notes:</strong> {expense.notes}</p>
          <div>
            <strong>Category:</strong>
            {categories.filter(category => category._id === expense.category).map((filteredCategory, index) => (
              <span key={index}>
                {filteredCategory.name}
                {CategoryIcons[filteredCategory.name] && (
                  <img src={CategoryIcons[filteredCategory.name]} alt={`${filteredCategory.name} Icon`} style={{ width: '20px', height: '20px', marginLeft: '10px' }} />
                )}
              </span>
            ))}
          </div>
          <button onClick={() => handleDeleteExpense(expense._id)}>Delete</button>
          <button onClick={() => handleEditExpense(expense)}>Edit</button>
          {isEditing && currentExpense._id === expense._id && (
    <form onSubmit={handleUpdateExpense}>
        <textarea name="notes" defaultValue={expense.notes}></textarea>
        <button type="submit">Update</button>
        <button onClick={() => setIsEditing(false)}>Cancel</button>
    </form>
)}
          <hr />
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;

