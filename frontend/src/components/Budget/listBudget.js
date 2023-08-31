import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBudgets, deleteBudget } from '../../store/budget';
import { fetchCategories } from '../../store/categories';
import UpdateBudgetModal from './updateBudget';
import BudgetPieChart from './budgetpieChart';
import { formattedDate } from '../../Util/dateUtil';

function ListBudget() {
  const dispatch = useDispatch();
  const budgets = useSelector(state => state.budget); 
  const currentUser = useSelector(state => state.session.user);
  const categories = useSelector(state => state.categories)
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [timeFrame, setTimeFrame] = useState("all");

  let startDate, endDate;
    const today = new Date();
    endDate = today.toISOString().split('T')[0]; // current date

    switch (timeFrame) {
      case 'daily':
        startDate = today.toISOString().split('T')[0];
        break;
      case 'weekly':
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7);
        startDate = lastWeek.toISOString().split('T')[0];
        break;
      case 'monthly':
        const lastMonth = new Date(today);
        lastMonth.setMonth(today.getMonth() - 1);
        startDate = lastMonth.toISOString().split('T')[0];
        break;
      default:
        startDate = undefined;
        endDate = undefined;
    }
  const handleOpenUpdateModal = (budget) => {
    setSelectedBudget(budget);
    setShowUpdateModal(true);
  };
  
  const handleCloseUpdateModal = () => {
    setSelectedBudget(null);
    setShowUpdateModal(false);
  };
  
  const handleFetchBudgets = () => {
    dispatch(fetchBudgets(startDate, endDate));
  };
  
  
  useEffect(() => {
    handleFetchBudgets();
    dispatch(fetchCategories());
  }, [dispatch, timeFrame]);
  
  const handleDeleteBudget = (budgetId) => {
    dispatch(deleteBudget(budgetId));
  };

  const getRemainingDaysPercent = (startDate, endDate, maxWidth) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const now = new Date();
        const totalDays = (end - start) / (1000 * 60 * 60 * 24);
        const elapsedDays = (now - start) / (1000 * 60 * 60 * 24);
        let remainingDaysPercent = ((totalDays - elapsedDays) / totalDays) * 100;
      
        // Ensure the black line doesn't go off the bar
        if (remainingDaysPercent < 0) {
          remainingDaysPercent = 0;
        } else if (remainingDaysPercent > maxWidth) {
          remainingDaysPercent = maxWidth;
        }
      
        return remainingDaysPercent;
      };
      
  return (
    <div className="budget-container">
        <div id="budget-list">
          <ul>
        {budgets.map((budget) => (
          <li key={budget._id}>
            <p><strong>Budget Plan:</strong> {budget.budgetPlan}</p>
            <p><strong>Budget Category:</strong> {categories.filter(category => category._id === budget.category).map(filteredCategory => filteredCategory.name)}</p>
            <p><strong>Notes:</strong> {budget.notes}</p>
            <p><strong>Date:</strong> {formattedDate(budget.date)}</p>
            <p><strong>End Date: </strong>{formattedDate(budget.endDate)}</p>
            <p><strong>${budget.remainingAmount}/${budget.budgetAmount}</strong></p>
            <div style={{ position: 'relative', width: '200px', height: '20px', backgroundColor: 'lightgray' }}>
              {/* Budget bar */}
              <div style={{ 
                width: `${(budget.remainingAmount / budget.budgetAmount) * 100}%`, 
                height: '100%', 
                backgroundColor: 'green' 
              }}></div>
              {/* Remaining Days bar */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: `${getRemainingDaysPercent(budget.startDate, budget.endDate, 100)}%`, // 100% is the max width
                width: '2px',
                height: '100%',
                backgroundColor: 'black'
              }}></div>
            </div>

            {/* Other properties */}
            <button onClick={() => handleOpenUpdateModal(budget)}>Update</button>
            <button onClick={() => handleDeleteBudget(budget._id)}>Delete</button>
          </li>
        ))}
      </ul>
    {showUpdateModal && (
        <UpdateBudgetModal budget={selectedBudget} categories={categories} closeModal={handleCloseUpdateModal}/>
        )}
      </div>
      <div id='budget-chart'>
        <BudgetPieChart/>
      </div>
    </div>
  );
}

export default ListBudget;
