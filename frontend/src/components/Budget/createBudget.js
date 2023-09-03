import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBudget } from '../../store/budget';
import './Budget.css';
import { getCurrentMonthYear } from '../../Util/dateUtil';

function CreateBudget({chartTimeFrame, setChartTimeFrame}) {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const categories = useSelector(state => state.categories);
  const [selectedInterval, setSelectedInterval] = useState('monthly'); // Default value is 'monthly'

  const [newBudget, setNewBudget] = useState({
    budgetAmount: '',
    budgetPlan: '',
    notes: '',
    category: categories.length > 0 ? categories[0]._id : '',
    date: '',
    user: currentUser._id,
    endDate: '',
    startDate: '',
    planningInterval:selectedInterval
  });

  const handleCreateBudget = () => {
    const {startDate, endDate} = getCurrentMonthYear(selectedInterval, newBudget.date)
    dispatch(createBudget({...newBudget, endDate,startDate, planningInterval: selectedInterval,
      chartTimeFrame:chartTimeFrame}));
    setNewBudget({
      budgetAmount: 0,
      budgetPlan: '',
      notes: '',
      date:'',
      category:'',
      user: currentUser._id,
      endDate: '',
      startDate:'',
      planningInterval:''
      // Other properties
    });
  };

  return (
    <div className="create-budget-form">
       <h2>Add New Budget</h2>
      <div>
        <label>
          Budget Plan:
          <input
            type="string"
            value={newBudget.budgetPlan}
            onChange={(e) =>
              setNewBudget({ ...newBudget, budgetPlan: e.target.value })
            }
            />
        </label>
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
