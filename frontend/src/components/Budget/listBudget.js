import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBudgets, deleteBudget} from '../../store/budget';
import { fetchCategories } from '../../store/categories';
import UpdateBudgetModal from './updateBudget';
import BudgetPieChart from './budgetpieChart';
import { formattedDate } from '../../Util/dateUtil';

function ListBudget({chartTimeFrame, setChartTimeFrame}) {
  const dispatch = useDispatch();
  const budgets = useSelector(state => state.budget.all); 
  const budgets_month = useSelector(state => state.budget.monthly); 
  const budgets_year = useSelector(state => state.budget.yearly); 

  const currentUser = useSelector(state => state.session.user);
  const categories = useSelector(state => state.categories)
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

    let startDate, endDate;
    const today = new Date();
    endDate = today.toISOString().split('T')[0]; // current date

    switch (chartTimeFrame) {
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
  const handleTimeFrameChange = (e) => {
    setChartTimeFrame(e.target.value);
  };
  const handleFetchBudgets = () => {
    dispatch(fetchBudgets());
    dispatch(fetchBudgets('monthly'));
    dispatch(fetchBudgets('yearly'));
  };
  
  
  useEffect(() => {
    const fn = async () => {
      await handleFetchBudgets();
      await dispatch(fetchCategories());
      await dispatch(fetchBudgets(chartTimeFrame,'chart'));
      setIsLoading(false);
    }
    fn();
  }, [dispatch, chartTimeFrame]);
  

  const handleDeleteBudget = (budgetId,timeFrame) => {
    dispatch(deleteBudget(budgetId,timeFrame));
  };

  const getRemainingDaysPercent = (startDate, endDate, maxWidth) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const now = new Date();
        const totalDays = (end - start) / (1000 * 60 * 60 * 24);
        const elapsedDays = (now - start) / (1000 * 60 * 60 * 24);
        let remainingDaysPercent = ((totalDays - elapsedDays) / totalDays) * 100;
      
        if (remainingDaysPercent < 0) {
          remainingDaysPercent = 0;
        } else if (remainingDaysPercent > maxWidth) {
          remainingDaysPercent = maxWidth;
        }
      
        return remainingDaysPercent;
      };
      
  return (
  <>
    <div id='budget-chart'>
      <label htmlFor="timeFrame">Select Time Frame: </label>
      <select id="timeFrame" value={chartTimeFrame} onChange={handleTimeFrameChange}>
          <option value="all">All</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
      </select>
      <BudgetPieChart/>
    </div>
    <div className="budget-list">
      <h1>month</h1>
          <ul>
        {budgets_month?.map((budget) => (
          <li key={budget._id}>
            <p><strong>Budget Plan:</strong> {budget.budgetPlan}</p>
            <p><strong>Budget Category:</strong> {categories.filter(category => category._id === budget.category).map(filteredCategory => filteredCategory.name)}</p>
            <p><strong>Notes:</strong> {budget.notes}</p>
            <p><strong>Date:</strong> {formattedDate(budget.date)}</p>
            <p><strong>End Date: </strong>{formattedDate(budget.endDate)}</p>
            <p style={{ color: budget.remainingAmount < 0 ? 'red' : 'green' }}>
              <strong>${budget.remainingAmount}/${budget.budgetAmount}</strong>
            </p>
            <div style={{ position: 'relative', width: '200px', height: '20px', backgroundColor: 'lightgray' }}>
    { budget.remainingAmount >= 0 ? (
        <div style={{ 
            width: `${(budget.remainingAmount / budget.budgetAmount) * 100}%`, 
            height: '100%', 
            backgroundColor: 'green' 
        }}></div>
    ) : (
        <div style={{ 
            width: `${Math.min((Math.abs(budget.remainingAmount) / budget.budgetAmount) * 100, 100)}%`, 
            height: '100%', 
            backgroundColor: 'red' 
        }}></div>
    )}
    <div style={{
        position: 'absolute',
        top: 0,
        left: `${getRemainingDaysPercent(budget.startDate, budget.endDate, 100)}%`, // 100% is the max width
        width: '2px',
        height: '100%',
        backgroundColor: 'black'
    }}></div>
</div>


            <button onClick={() => handleOpenUpdateModal(budget)}>Update</button>
            <button onClick={() => handleDeleteBudget(budget._id,'monthly')}>Delete</button>
          </li>
        ))}
      </ul>
    {showUpdateModal && (
        <UpdateBudgetModal budget={selectedBudget} categories={categories} closeModal={handleCloseUpdateModal}
        chartTimeFrame={chartTimeFrame}/>
        )}
    </div>


    <div className="budget-list">
      <h1>Year</h1>
          <ul>
        {budgets_year?.map((budget) => (
          <li key={budget._id}>
            <div>Budget Plan: {budget.budgetPlan}</div>
            <div>Budget Category: {categories.filter(category => category._id === budget.category).map(filteredCategory => filteredCategory.name)}</div>
            <div>Notes: {budget.notes}</div>
            <div>Date: {formattedDate(budget.date)}</div>
            <div>EndDate: {formattedDate(budget.endDate)}</div>
            <div>{budget.remainingAmount}/{budget.budgetAmount}</div>
            <div style={{ position: 'relative', width: '200px', height: '20px', backgroundColor: 'lightgray' }}>
    { budget.remainingAmount >= 0 ? (
        <div style={{ 
            width: `${(budget.remainingAmount / budget.budgetAmount) * 100}%`, 
            height: '100%', 
            backgroundColor: 'green' 
        }}></div>
    ) : (
        <div style={{ 
            width: `${Math.min((Math.abs(budget.remainingAmount) / budget.budgetAmount) * 100, 100)}%`, 
            height: '100%', 
            backgroundColor: 'red' 
        }}></div>
    )}
    <div style={{
        position: 'absolute',
        top: 0,
        left: `${getRemainingDaysPercent(budget.startDate, budget.endDate, 100)}%`, // 100% is the max width
        width: '2px',
        height: '100%',
        backgroundColor: 'black'
    }}></div>
</div>


            <button onClick={() => handleOpenUpdateModal(budget)}>Update</button>
            <button onClick={() => handleDeleteBudget(budget._id,'yearly')}>Delete</button>
          </li>
        ))}
      </ul>
    {showUpdateModal && (
        <UpdateBudgetModal budget={selectedBudget} categories={categories} closeModal={handleCloseUpdateModal}
        chartTimeFrame={chartTimeFrame}/>
        )}
    </div>
  </>

  );
}

export default ListBudget;
