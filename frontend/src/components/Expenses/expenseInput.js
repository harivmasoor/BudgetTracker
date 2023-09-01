import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense } from '../../store/expenses';
import { fetchCategories } from '../../store/categories';
import ExpenseList from './expenseList';
import { fetchBudgets,FETCH_BUDGETS } from '../../store/budget';
import './Expenses.css';

function ExpenseInput() {
  const categories = useSelector(state => state.categories);
  const dispatch = useDispatch();
  const [expenseData, setExpenseData] = useState({
    variableExpenses: '',  // Field for variable expenses
    notes: '',  // Field for notes
    category: '', // Field for category
    date: '' // Field for date
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleChange = (e) => {
    setExpenseData({
      ...expenseData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addExpense(expenseData));
    dispatch(fetchBudgets(FETCH_BUDGETS));
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="variableExpenses">Variable Expense ($):</label>
        <input 
          type="number" 
          id="variableExpenses" 
          name="variableExpenses" 
          value={expenseData.variableExpenses} 
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="date">Date:</label>
        <input 
          type="date" 
          id="date" 
          name="date" 
          value={expenseData.date} 
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="notes">Notes:</label>
        <textarea 
          id="notes" 
          name="notes" 
          value={expenseData.notes} 
          onChange={handleChange}
        ></textarea>
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <select 
          id="category" 
          name="category" 
          value={expenseData.category} 
          onChange={handleChange}
        >
          <option value="" disabled>Select a category</option>
          {categories.map((category, index) => (
            <option key={index} value={category._id}>{category.name}</option>
          ))}
        </select>
      </div>
      
      <button type="submit">Add Expense</button>
    </form>
    </div>
  );
}

export default ExpenseInput;

