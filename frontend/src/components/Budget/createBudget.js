import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBudget } from '../../store/budget';
import './Budget.css';
import { getCurrentMonthYear } from '../../Util/dateUtil';

function CreateBudget({chartTimeFrame, setChartTimeFrame,closeModal}) {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const categories = useSelector(state => state.categories);
  const [selectedInterval, setSelectedInterval] = useState('monthly'); // Default value is 'monthly'
  const [validationError, setValidationError] = useState({}); 
  // const budgets_month = useSelector(state => state.budget.monthly); 

  const [newBudget, setNewBudget] = useState({
    budgetAmount: '',
    budgetPlan: '',
    notes: '',
    // category: categories.length > 0 ? categories[0]._id : '',
    category: '',
    date: '',
    user: currentUser._id,
    endDate: '',
    startDate: '',
    planningInterval:selectedInterval
  });

  const handleCreateBudget = (e) => {
    e.preventDefault();
    if (parseFloat(newBudget.budgetAmount) <= 0) {
      setValidationError({ budgetAmount: "Budget amount must be greater than 0" });
    } else {
      const dateInfo = getCurrentMonthYear(selectedInterval, newBudget.date);
  
      if (dateInfo) {
        const { startDate, endDate } = dateInfo;
        dispatch(
          createBudget({
            ...newBudget,
            endDate,
            startDate,
            planningInterval: selectedInterval,
            chartTimeFrame: chartTimeFrame,
          })
        );
  
        // Reset the form and close modal if dispatch is successful
        setNewBudget({
          budgetAmount: 0,
          budgetPlan: "",
          notes: "",
          date: "",
          category: "",
          user: currentUser._id,
          endDate: "",
          startDate: "",
          planningInterval: "",
          // Other properties
        });
        closeModal();
      }
    };
  };
  
  if (!categories) return null;

  return (
    <div className="create-budget-form">
       <h2>Add New Budget</h2>
       <form onSubmit={handleCreateBudget}>
        <div>
          <label>
            Budget Plan:
            <input
              type="string"
              value={newBudget.budgetPlan}
              onChange={(e) =>
                setNewBudget({ ...newBudget, budgetPlan: e.target.value })
              }
              required
              />
          </label>
          <label>
            Budget Amount:
            <div className="errors">{validationError?.budgetAmount}</div>
            <input
              type="number"
              value={newBudget.budgetAmount}
              onChange={(e) =>
                setNewBudget({ ...newBudget, budgetAmount: e.target.value })
              }
              required
              />
          </label>
          <label>
            Date:
            <input
              type="date"
              value={newBudget.date}
              onChange={(e) =>
                setNewBudget({ ...newBudget, date: e.target.value })
              }
              required
              />
          </label>
          <label>
            Budget Note:
            <input
              type="string"
              value={newBudget.notes}
              onChange={(e) =>
                setNewBudget({ ...newBudget, notes: e.target.value })
              }
              />
          </label>
          <label>
            Budget Category:
            <select 
            id="category" 
            name="category" 
            value={newBudget.category} 
            onChange={(e) =>
              setNewBudget({ ...newBudget, category: e.target.value })
            }
            required
            >
            <option value="" disabled>Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category._id}>{category.name}</option>
              ))}
          </select>
          </label>
          <label>
              Select Planning Interval:
              <select
                value={selectedInterval}
                onChange={(e) => setSelectedInterval(e.target.value)}
                >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </label>
          {/* Other input fields */}
          <button >Add Budget</button>
        </div>

       </form>
    </div>
  );
}

export default CreateBudget;
