import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addExpense } from '../../store/expenses';

function ExpenseInput() {
  const dispatch = useDispatch();
  const [expenseData, setExpenseData] = useState({
    fixedExpenses: '',
    variableExpenses: '',
    user: '', 
    notes: '',
    category: ''
  });

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
    <label htmlFor="fixedExpenses">Fixed Expenses:</label>
    <input 
      type="number" 
      id="fixedExpenses" 
      name="fixedExpenses" 
      value={expenseData.fixedExpenses} 
      onChange={handleChange}
      placeholder="Enter fixed expenses amount"
    />
  </div>

  <div>
    <label htmlFor="variableExpenses">Variable Expenses:</label>
    <input 
      type="number" 
      id="variableExpenses" 
      name="variableExpenses" 
      value={expenseData.variableExpenses} 
      onChange={handleChange}
      placeholder="Enter variable expenses amount"
    />
  </div>

  <div>
    <label htmlFor="notes">Notes:</label>
    <textarea 
      id="notes" 
      name="notes" 
      value={expenseData.notes} 
      onChange={handleChange}
      placeholder="Any notes related to the expenses?"
    />
  </div>

  <div>
    <label htmlFor="category">Category:</label>
    <input 
      type="number" 
      id="category" 
      name="category" 
      value={expenseData.category} 
      onChange={handleChange}
      placeholder="Enter category number (e.g., 1, 2, 3...)"
    />
  </div>

  <button type="submit">Add Expense</button>
</form>

  );
}

export default ExpenseInput;