import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchExpenses } from '../../store/expenses';

function ExpenseList() {
  const categories = useSelector(state => state.categories);
  const dispatch = useDispatch();
  const expenses = useSelector(state => state.expenses);

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);
  if (!categories) return null;
  return (
    <div>
      {expenses.map(expense => (
        <div key={expense._id}>
          <p><strong>Variable Expense:</strong> ${expense.variableExpenses}</p>
          <p><strong>Date:</strong> {expense.date}</p>
          <p><strong>Notes:</strong> {expense.notes}</p>
          <div>Category: {categories.filter(category => category._id === expense.category).map(filteredCategory => filteredCategory.name)}</div>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;
