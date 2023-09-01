import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSavingsGoal } from '../../store/savingsGoal';  // Import your action
import Modal from '../Modal/Modal';
import SavingsGoalList from './savingsGoalList';

const SavingsGoalForm = () => {
  const [showModal, setShowModal] = useState(false);
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
    setShowModal(false); // Close modal after submitting
  };

  return (
    <div className="incomes-page-container">
      <h1>Savings Goals</h1>
      <button className="add-goal-button" onClick={() => setShowModal(true)}>Add Goal</button> 
      {/* Modal */}
      <Modal showModal={showModal} closeModal={() => setShowModal(false)}>
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
          <button type="submit">Add it!</button>
        </form>
      </Modal>
      <div className="incomes-page-container">
        <SavingsGoalList />
      </div>
    </div>
  );
};

export default SavingsGoalForm;
