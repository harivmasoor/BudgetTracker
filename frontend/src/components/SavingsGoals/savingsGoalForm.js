import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSavingsGoal } from '../../store/savingsGoal';  // Import your action
import Modal from '../Modal/Modal';
import SavingsGoalList from './savingsGoalList';

const SavingsGoalForm = () => {
  // const [showModal, setShowModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // const openModal = () => setShowModal(true);
  // const closeModal = () => setShowModal(false);
  const [goalAmount, setGoalAmount] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [validationError, setValidationError] = useState({});
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // setValidationError({})
    if (parseFloat(goalAmount) <= 0){
      setValidationError({goalAmount: "Goal amount must be greater than 0"});
    } else if (parseFloat(currentAmount) < 0){
      setValidationError({currentAmount: "Current amount must be greater than or equal to 0"});
    } else {
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
    setValidationError({})
  }
  };

  const closeModal = () => {
    setValidationError({});
    setGoalAmount('');
    setCurrentAmount('');
    setNotes(''); // Clear validation errors when closing the modal
    setShowModal(false);
  };

  return (
    <div className="incomes-page-container">
      <h1>Savings Goals</h1>
      <button className="add-goal-button" onClick={() => setShowModal(true)}>Add Goal</button> 
      {/* onClick={() => setShowModal(true)} */}
      {/* Modal */}

      <Modal showModal={showModal} closeModal={closeModal}>
        <form onSubmit={handleSubmit}>
        <div className="errors">{validationError?.goalAmount}</div>
          <input
            type="number"
            placeholder="Goal Amount"
            value={goalAmount}
            onChange={(e) => setGoalAmount(e.target.value)}
            required
          />
          <div className="errors">{validationError?.currentAmount}</div>
          <input
            type="number"
            placeholder="Current Amount"
            value={currentAmount}
            onChange={(e) => setCurrentAmount(e.target.value)}
            required
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
