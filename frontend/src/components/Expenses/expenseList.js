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
          {/* Display expense details */}
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;
