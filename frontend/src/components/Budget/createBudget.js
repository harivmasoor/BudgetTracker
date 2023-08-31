import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBudget } from '../../store/budget';
import { fetchCategories } from '../../store/categories';
import './Budget.css';

function CreateBudget() {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const categories = useSelector(state => state.categories);
  const [selectedInterval, setSelectedInterval] = useState('monthly'); // Default value is 'monthly'
  
  function getCurrentMonthYear(selectedInterval, dateInput) {
    // Get the current year and month
    const newDate = new Date(dateInput)
    const currentYear = newDate.getFullYear();
    const currentMonth = newDate.getMonth();
    // Calculate the start and end dates of the current month
    let startDate = new Date(currentYear, currentMonth, 1);
    let endDate = new Date(currentYear, currentMonth + 1, 0);
    if(selectedInterval === "monthly") {
      startDate = new Date(currentYear, currentMonth, 1);
      endDate = new Date(currentYear, currentMonth + 1, 0);
    }else{
      startDate = new Date(currentYear, 0, 1);
      endDate = new Date(currentYear +1, 0, 0);
    }
    return {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    };
  }

  const [newBudget, setNewBudget] = useState({
    budgetAmount: '',
    budgetPlan: selectedInterval,
    notes: '',
    category: categories.length > 0 ? categories[0]._id : '',
    date: '',
    user: currentUser._id,
    endDate: selectedInterval,
    startDate: '',
  });

  const handleCreateBudget = () => {
    const {startDate, endDate} = getCurrentMonthYear(selectedInterval, newBudget.date)
    dispatch(createBudget({...newBudget, endDate,startDate, budgetPlan: selectedInterval}));
    setNewBudget({
      budgetAmount: 0,
      budgetPlan: '',
      notes: '',
      date:'',
      category:'',
      user: currentUser._id,
      endDate: selectedInterval,
      startDate:''
      // Other properties
    });
  };

  return (
    <div className="create-budget-form">
       <h2>Add New Budget</h2>
      <div>
        <label>
          Budget Amount:
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
        <button onClick={handleCreateBudget}>Add Budget</button>
      </div>
    </div>
  );
}

export default CreateBudget;
