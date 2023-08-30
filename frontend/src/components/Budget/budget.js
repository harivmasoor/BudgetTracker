import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBudgets, createBudget, deleteBudget } from '../../store/budget';
import { fetchCategories } from '../../store/categories';
import UpdateBudgetModal from './updateBudget';
import BudgetPieChart from './budgetpieChart';

function Budget() {
  const dispatch = useDispatch();
  const budgets = useSelector(state => state.budget); 
  const currentUser = useSelector(state => state.session.user);
  const categories = useSelector(state => state.categories)
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);
  // console.log(currentUser._id)
  
  const handleOpenUpdateModal = (budget) => {
    setSelectedBudget(budget);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setSelectedBudget(null);
    setShowUpdateModal(false);
  };

  const [newBudget, setNewBudget] = useState({
    budgetAmount: '',
    budgetPlan: '',
    notes: '',
    category: categories.length > 0 ? categories[0]._id : '',
    date: '',
    user: currentUser._id
  });

      const handleFetchBudgets = () => {
        dispatch(fetchBudgets());
      };

  const handleCreateBudget = () => {
    dispatch(createBudget(newBudget));
    setNewBudget({
      budgetAmount: 0,
      budgetPlan: '',
      notes: '',
      date:'',
      category:'',
      user: currentUser._id
      // Other properties
    });
  };

  useEffect(() => {
    handleFetchBudgets();
    dispatch(fetchCategories());
  }, []);

  const handleDeleteBudget = (budgetId) => {
      dispatch(deleteBudget(budgetId));
  };

    
  return (
    <div>
        <ul>
        {budgets.map((budget) => (
          <li key={budget._id}>
            <div>Budget Amount: {budget.budgetAmount}</div>
            <div>Budget Plan: {budget.budgetPlan}</div>
            <div>Budget Category: {categories.filter(category => category._id === budget.category).map(filteredCategory => filteredCategory.name)}</div>
            <div>Notes: {budget.notes}</div>
            <div>Date: {new Date(budget.date).toLocaleDateString()}</div>
            {/* Other properties */}
            <button onClick={() => handleOpenUpdateModal(budget)}>Update</button>
            <button onClick={() => handleDeleteBudget(budget._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Add New Budget</h2>
      <div>
        <label>
          Budget Plan Name:
          <input
            type="text"
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
        {/* Other input fields */}
        <button onClick={handleCreateBudget}>Add Budget</button>
      </div>
      {showUpdateModal && (
        <UpdateBudgetModal budget={selectedBudget} categories={categories} closeModal={handleCloseUpdateModal}/>
        )}
        <BudgetPieChart/>
    </div>
  );
}

export default Budget;
