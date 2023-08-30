import React from 'react';
import { useSelector } from 'react-redux';
import './Income.css';

function IncomeList() {
  const incomes = useSelector(state => state.incomes);
  const incomeCategories = useSelector(state => state.incomeCategories);

  return (
    <div className="income-list-container">
      {incomes.map(income => (
        <div key={income._id} className="income-item">
          <p><strong>Income Source:</strong> {income.incomesource}</p>
          <p><strong>Income Amount:</strong> ${income.incomeamount}</p>
          <p><strong>Notes:</strong> {income.notes}</p>
          <p><strong>Category:</strong>
            {income.category ? incomeCategories.filter(category =>
              category._id === income.category).map(filteredCategory => filteredCategory.name) : 'N/A'}
          </p>
          <p><strong>Date:</strong> {income.date}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default IncomeList;
