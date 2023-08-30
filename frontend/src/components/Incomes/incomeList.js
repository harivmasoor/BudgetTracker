import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchIncomes ,deletedIncome} from '../../store/incomes';
import { fetchIncomeCategories } from '../../store/incomeCategories';
import React from 'react';
import './Income.css';

function IncomeList() {
  const incomes = useSelector(state => state.incomes);
  const incomeCategories = useSelector(state => state.incomeCategories);
  const dispatch = useDispatch();

  const formattedDate = (date) => {
    return date.split('T')[0]; // Extract the date part
  };

  useEffect(() => {
    dispatch(fetchIncomes());
    dispatch(fetchIncomeCategories());
  }, []);

  const handleDeleteIncome = (incomeId) => {
    dispatch(deletedIncome(incomeId));
  };

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
          <button onClick={() => handleDeleteIncome(income._id)}>Delete</button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default IncomeList;
