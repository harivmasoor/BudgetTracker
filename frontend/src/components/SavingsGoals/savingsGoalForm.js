import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSavingsGoal } from '../../store/savingsGoal';  // Import your action
import SavingsGoalList from './savingsGoalList';

const SavingsGoalForm = () => {
  const [goalAmount, setGoalAmount] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');
  const [notes, setNotes] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const savingsGoalData = {
      goalAmount: parseFloat(goalAmount),
      currentAmount: parseFloat(currentAmount),
      notes,
      date: new Date(),
    };
    dispatch(addSavingsGoal(savingsGoalData));
    setGoalAmount('');
    setCurrentAmount('');
    setNotes('');
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Goal Amount"
        value={goalAmount}
        onChange={(e) => setGoalAmount(e.target.value)}
      />
      <input
        type="number"
        placeholder="Current Amount"
        value={currentAmount}
        onChange={(e) => setCurrentAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <button type="submit">Add Savings Goal</button>
    </form>
    <SavingsGoalList/>
    </>
  );
};

export default SavingsGoalForm;