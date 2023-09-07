import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateSavingsGoal } from '../../store/savingsGoal';
import '../Budget/modal.css'

const SavingsGoalUpdateModal = ({ goal, closeModal }) => {
  const [updatedGoalAmount, setUpdatedGoalAmount] = useState(goal.goalAmount);
  const [updatedCurrentAmount, setUpdatedCurrentAmount] = useState(goal.currentAmount);
  const [updatedNotes, setUpdatedNotes] = useState(goal.notes);
  const dispatch = useDispatch();
// push test
  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedSavingsGoalData = {
      _id: goal._id,  
      goalAmount: parseFloat(updatedGoalAmount),
      currentAmount: parseFloat(updatedCurrentAmount),
      notes: updatedNotes,
    };
    dispatch(updateSavingsGoal(updatedSavingsGoalData));
    closeModal();
  };

  return (
    <div className="update-modal">
       <div className="modal">
       <div className="modal-content">
      <h2>Update Savings Goal</h2>
      <form onSubmit={handleUpdate}>
        <input
        className="your-input-class"
          type="number"
          placeholder="Goal Amount"
          value={updatedGoalAmount}
          onChange={(e) => setUpdatedGoalAmount(e.target.value)}
        />
        <input
        className="your-input-class"
          type="number"
          placeholder="Current Amount"
          value={updatedCurrentAmount}
          onChange={(e) => setUpdatedCurrentAmount(e.target.value)}
        />
        <input
        className="your-input-class"
          type="text"
          placeholder="Notes"
          value={updatedNotes}
          onChange={(e) => setUpdatedNotes(e.target.value)}
        />
        <button type="submit">Update Goal</button>
        <button type="button" onClick={closeModal}>Cancel</button>
      </form>
    </div>
    </div>
        </div>
  );
};

export default SavingsGoalUpdateModal;
