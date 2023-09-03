    import { useState } from 'react';
    import { useDispatch, useSelector } from 'react-redux';
    import { updateBudget } from '../../store/budget';
    import './modal.css'
    import './Budget.css';


    function UpdateBudgetModal({ budget, categories, closeModal ,chartTimeFrame}) {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    
    const [updatedBudget, setUpdatedBudget] = useState({
        _id: budget._id,
        budgetAmount: budget.budgetAmount,
        budgetPlan: budget.budgetPlan,
        notes: budget.notes,
        category: budget.category,
        date: budget.date,
        user: currentUser._id
    });

    const handleUpdateBudget = () => {
        dispatch(updateBudget({...updatedBudget,chartTimeFrame:chartTimeFrame}));
        closeModal();
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdatedBudget({...updatedBudget, [name]: value,});
    };

    return (
        <div className="budgets-page-container">
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
                value={updatedBudget.budgetAmount}
                onChange={handleInputChange}
            />
            </label>
            <label>
            Budget Note:
            <input
                type="text"
                name="notes"
                value={updatedBudget.notes}
                onChange={handleInputChange}
            />
            </label>
            <label>
            Date:
            <input
                type="date"
                name="date"
                value={(updatedBudget.date).split('T')[0]}
                onChange={handleInputChange}
            />
            Budget Category:
            <select 
            id="category" 
            name="category" 
            value={updatedBudget.category} 
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
        </div>
    );
    }

    export default UpdateBudgetModal;
