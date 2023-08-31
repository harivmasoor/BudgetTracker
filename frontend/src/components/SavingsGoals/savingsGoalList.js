import React from 'react';
import { useSelector } from 'react-redux';
import SavingsGoalItem from './savingsGoalItem';

const SavingsGoalList = () => {
  const savingsGoals = useSelector((state) => state.savingsGoal);  // Replace with your actual state
// console
  return (
    <div>
      {savingsGoals?.map((goal) => (
        <SavingsGoalItem key={goal._id} goal={goal} />
      ))}
    </div>
  );
};

export default SavingsGoalList;
