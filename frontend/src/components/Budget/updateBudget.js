    import { useState } from 'react';
    import { useDispatch } from 'react-redux';
    import { updateBudget } from '../../store/budget';
    import './modal.css'

    function UpdateBudgetModal({ budget, categories, closeModal }) {
    const dispatch = useDispatch();
    
    const [updatedBudget, setUpdatedBudget] = useState({
        budgetAmount: budget.budgetAmount,
        budgetPlan: budget.budgetPlan,
        notes: budget.notes,
        category: budget.category,
        date: budget.date,
        user: budget.user
    });

    const handleUpdateBudget = () => {
        dispatch(updateBudget(updatedBudget));
        closeModal();
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdatedBudget({
        ...updatedBudget,
        [name]: value,
        });
    };

    return (
        <div className="modal">
        <div className="modal-content">
            <h2>Update Budget</h2>
            <label>
            Budget Plan:
            <input
                type="text"
                name="budgetPlan"
                value={updatedBudget.budgetPlan}
                onChange={handleInputChange}
            />
            </label>
            <label>
            Budget Amount:
            <input
                type="text"
                name="budgetAmount"
                value={updatedBudget.budgetPlan}
                onChange={handleInputChange}
            />
            </label>
            <label>
            Budget Note:
            <input
                type="text"
                name="note"
                value={updatedBudget.budgetPlan}
                onChange={handleInputChange}
            />
            </label>
            <label>
            Date:
            <input
                type="date"
                name="date"
                value={updatedBudget.budgetPlan}
                onChange={handleInputChange}
            />
            Budget Category:
            <select 
            id="category" 
            name="category" 
            value={updatedBudget.budgetPlan} 
            onChange={handleInputChange}
            >
            <option value="" disabled>Select a category</option>
            {categories.map((category, index) => (
                <option key={index} value={category._id}>{category.name}</option>
            ))}
            </select>
            </label>
            {/* Other input fields */}
            <button onClick={handleUpdateBudget}>Update</button>
            <button onClick={closeModal}>Cancel</button>
        </div>
        </div>
    );
    }

    export default UpdateBudgetModal;
