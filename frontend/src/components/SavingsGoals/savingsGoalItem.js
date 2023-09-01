import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SavingsGoalNotification from './SavingsGoalNotifications';
import SavingsGoalUpdateModal from './savingsGoalUpdate';
import { deleteSavingGoal } from '../../store/savingsGoal';

const SavingsGoalItem = ({ goal }) => {
  const dispatch = useDispatch();
  const { goalAmount, currentAmount } = goal;
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleOpenUpdateModal = () => {
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };

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

  const handleDeleteSavingGoal = (savingGoalId) => {
    dispatch(deleteSavingGoal(savingGoalId));
  };

  return (
    <div>
      <h2>{goal.notes}</h2>
      <p>Goal Amount: {goal.goalAmount}</p>
      <p>Current Amount: {goal.currentAmount}</p>

      <div style={{ position: 'relative', width: '200px', height: '20px', backgroundColor: 'lightgray' }}>
        <div style={{ 
          width: `${(currentAmount / goalAmount) * 100}%`, 
          height: '100%', 
          backgroundColor: currentAmount >= goalAmount ? 'green' : 'orange'
        }}></div>
      </div>

      <button onClick={handleOpenUpdateModal}>Update Goal</button>
      <button onClick={() => handleDeleteSavingGoal(goal._id)}>Delete</button>
      {showUpdateModal && (
        <SavingsGoalUpdateModal goal={goal} closeModal={handleCloseUpdateModal} />
      )}
      <SavingsGoalNotification goal={goal} />
    </div>
  );
};

export default SavingsGoalItem;
