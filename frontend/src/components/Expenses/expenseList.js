import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchExpenses } from '../../store/expenses';

function ExpenseList() {
  const dispatch = useDispatch();
  const expenses = useSelector(state => state.expenses);

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  return (
    <div>
      {expenses.map(expense => (
        <div key={expense._id}>
          <p><strong>Variable Expense:</strong> ${expense.variableExpenses}</p>
          <p><strong>Notes:</strong> {expense.notes}</p>
          <p><strong>Category:</strong> {expense.category ? expense.category.name : 'N/A'}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;
