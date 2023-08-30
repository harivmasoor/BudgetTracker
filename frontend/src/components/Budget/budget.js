import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBudgets, createBudget, deleteBudget } from '../../store/budget';
import { fetchCategories } from '../../store/categories';
import UpdateBudget from './updateBudget';

function Budget() {
  const dispatch = useDispatch();
  const budgets = useSelector(state => state.budget); // Assuming you've named your reducer "budget"
  const currentUser = useSelector(state => state.session.user);
  const categories = useSelector(state => state.categories)
  // console.log(currentUser._id)
  
  const [newBudget, setNewBudget] = useState({
    budgetAmount: '',
    budgetPlan: '',
    notes: '',
    category: categories.length > 0 ? categories[0]._id : '',
    date: '',
    user: currentUser._id
  });

    //   const objectById = {};
    // for (const item of array) {
    //   objectById[item.id] = item;
    // }
    // console.log(objectById);

    // const objectById = array.reduce((acc, item) => {
    //   acc[item.id] = item;
    //   return acc;
    // }, {});
    // console.log(objectById);
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
            <div>Date: {budget.date}</div>
            {/* Other properties */}
            <button onClick={() => handleDeleteBudget(budget._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Add New Budget</h2>
      <div>
        <label>
          Budget Plan:
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
    </div>
  );
}

export default Budget;
