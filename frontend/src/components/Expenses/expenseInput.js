import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense } from '../../store/expenses';
import { fetchCategories } from '../../store/categories';

function ExpenseInput() {
  const categories = useSelector(state => state.categories);
  const dispatch = useDispatch();
  const [expenseData, setExpenseData] = useState({
    fixedExpenses: '',
    variableExpenses: '',
    user: '', 
    notes: '',
    category: ''
  });
  // const [categories, setCategories] = useState([]);

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
  };

  return (
    <form onSubmit={handleSubmit}>
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
  );
}

export default ExpenseInput;
