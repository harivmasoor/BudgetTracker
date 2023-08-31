import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchIncomes ,deletedIncome} from '../../store/incomes';
import { fetchIncomeCategories } from '../../store/incomeCategories';
import React from 'react';
import './Income.css';
import { formattedDate } from '../../Util/dateUtil';

function IncomeList() {
  const incomes = useSelector(state => state.incomes.income);
  const incomeCategories = useSelector(state => state.incomeCategories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIncomes());
    dispatch(fetchIncomeCategories());
  }, []);

  const handleDeleteIncome = (incomeId) => {
    dispatch(deletedIncome(incomeId));
  };

  return (
    <div>
      {incomes && incomes.map(income => (
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
