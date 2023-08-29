import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBudget, deleteBudget } from '../../store/budget';

function UpdateBudget({budget}){

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const [updatedBudget, setupdatedBudget] = useState({
        budgetAmount: budget.budgetAmount,
        budgetPlan: budget.budgetPlan,
        notes: budget.notes,
        category: budget.category,
        // date:'',
        user: currentUser._id
    });

    const handleUpdateBudget = (upd) => {
        const  updatedData ={
            budgetAmount: budget.budgetAmount,
            budgetPlan: budget.budgetPlan,
            notes: budget.notes,
            category: budget.category,
            // date:'',
            user: currentUser._id
        };
        dispatch(updateBudget(updatedData));
    };

    const handleDeleteBudget = (budgetId) => {
        dispatch(deleteBudget(budgetId));
    };
}
export default UpdateBudget;