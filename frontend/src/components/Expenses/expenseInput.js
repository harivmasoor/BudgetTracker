import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense } from '../../store/expenses';
import { fetchCategories } from '../../store/categories';
import ExpenseList from './expenseList';
import { fetchBudgets,FETCH_BUDGETS } from '../../store/budget';
import './Expenses.css';

function ExpenseInput({closeModal,setIsLoading}) {
  const categories = useSelector(state => state.categories);
  const dispatch = useDispatch();
  const [validationError, setValidationError] = useState({});
  const [expenseData, setExpenseData] = useState({
    variableExpenses: '',  // Field for variable expenses
    notes: '',  // Field for notes
    category: '', // Field for category
    date: '' // Field for date
  });

  // useEffect(() => {
  //   dispatch(fetchCategories());
  // }, [dispatch]);

  const handleChange = (e) => {
    setExpenseData({
      ...expenseData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseFloat(expenseData.variableExpenses) <= 0) {
      setValidationError({variableExpenses: "Expenses amount must be greater than 0"});
    }
    else{

    const fn = async () => {
      await dispatch(addExpense(expenseData));
      await dispatch(fetchBudgets(FETCH_BUDGETS));
      setIsLoading(false);
      closeModal();
    }
    fn();
  }
  };
  if (!categories) return null;

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="variableExpenses">Variable Expense ($):</label>
        <div className="errors">{validationError?.variableExpenses}</div>
        <input 
          type="number" 
          id="variableExpenses" 
          name="variableExpenses" 
          value={expenseData.variableExpenses} 
          onChange={handleChange}
          required
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
          required
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
          required
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

