import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateSavingsGoal } from '../../store/savingsGoal';  // Import your update action

const SavingsGoalUpdateModal = ({ goal, closeModal }) => {
  const [updatedGoalAmount, setUpdatedGoalAmount] = useState(goal.goalAmount);
  const [updatedCurrentAmount, setUpdatedCurrentAmount] = useState(goal.currentAmount);
  const [updatedNotes, setUpdatedNotes] = useState(goal.notes);
  const dispatch = useDispatch();

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedSavingsGoalData = {
      _id: goal._id,  // Pass the goal ID for updating
      goalAmount: parseFloat(updatedGoalAmount),
      currentAmount: parseFloat(updatedCurrentAmount),
      notes: updatedNotes,
    };
    dispatch(updateSavingsGoal(updatedSavingsGoalData));
    closeModal();  // Close the modal after updating
  };

  return (
    <div className="update-modal">
      <h2>Update Savings Goal</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="number"
          placeholder="Goal Amount"
          value={updatedGoalAmount}
          onChange={(e) => setUpdatedGoalAmount(e.target.value)}
        />
        <input
          type="number"
          placeholder="Current Amount"
          value={updatedCurrentAmount}
          onChange={(e) => setUpdatedCurrentAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Notes"
          value={updatedNotes}
          onChange={(e) => setUpdatedNotes(e.target.value)}
        />
        <button type="submit">Update Goal</button>
        <button type="button" onClick={closeModal}>Cancel</button>
      </form>
    </div>
  );
};

export default SavingsGoalUpdateModal;
