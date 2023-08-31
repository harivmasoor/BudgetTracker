import React, { useEffect } from 'react';
import SavingsGoalNotification from './SavingsGoalNotifications';

const SavingsGoalItem = ({ goal }) => {
  const { goalAmount, currentAmount } = goal;
  
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

  return (
    <div>
      <h2>{goal.notes}</h2>
      <p>Goal Amount: {goal.goalAmount}</p>
      <p>Current Amount: {goal.currentAmount}</p>
      <SavingsGoalNotification goal={goal} />
    </div>
  );
};

export default SavingsGoalItem;
