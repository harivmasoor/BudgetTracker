import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchIncomes } from '../../store/incomes';
import { fetchIncomeCategories } from '../../store/incomeCategories';

function IncomeList() {
  const dispatch = useDispatch();
  const incomes = useSelector(state => state.incomes);
  const incomeCategories = useSelector(state => state.incomeCategories)

  const formattedDate = (date) => {
    return date.split('T')[0]; // Extract the date part
  };

  useEffect(() => {
    dispatch(fetchIncomes());
    dispatch(fetchIncomeCategories());
  }, []);

  return (
    <div>
      {incomes.map(income => (
        <div key={income._id}>
          <p><strong>Income Source:</strong> {income.incomesource}</p>
          <p><strong>Income Amount:</strong> ${income.incomeamount}</p>
          <p><strong>Notes:</strong> {income.notes}</p>
          <p><strong>Category:</strong> 
          {income.category ? incomeCategories.filter(category => 
            category._id === income.category).map(filteredCategory => filteredCategory.name) : 'N/A'}
          </p>
          <p><strong>Date:</strong> {formattedDate(income.date)}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default IncomeList;
