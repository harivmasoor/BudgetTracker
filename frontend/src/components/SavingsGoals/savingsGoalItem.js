import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SavingsGoalNotification from './SavingsGoalNotifications';
import SavingsGoalUpdateModal from './savingsGoalUpdate';
import { deleteSavingGoal } from '../../store/savingsGoal';

const SavingsGoalItem = ({ goal }) => {
  const dispatch = useDispatch();
  const { goalAmount, currentAmount } = goal;
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  
  useEffect(() => {
    // Logic for notifications
    if (currentAmount >= goalAmount) {
      // Notify 100%
    } else if (currentAmount >= 0.75 * goalAmount) {
      // Notify 75%
    } else if (currentAmount >= 0.5 * goalAmount) {
      // Notify 50%
    } else if (currentAmount >= 0.25 * goalAmount) {
      // Notify 25%
    }
  }, [currentAmount, goalAmount]);

  const openUpdateModal = () => {
    setShowUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const handleDeleteSavingGoal = (savingGoalId) => {
    dispatch(deleteSavingGoal(savingGoalId));
  };


  return (
    <div>
      <h2>{goal.notes}</h2>
      <p>Goal Amount: {goal.goalAmount}</p>
      <p>Current Amount: {goal.currentAmount}</p>
      <button onClick={openUpdateModal}>Update Goal</button>
      <button onClick={() => handleDeleteSavingGoal(goal._id)}>Delete</button>
      {showUpdateModal && (
        <SavingsGoalUpdateModal goal={goal} closeModal={closeUpdateModal} />
      )}
      <SavingsGoalNotification goal={goal} />
    </div>
  );
};

export default SavingsGoalItem;
