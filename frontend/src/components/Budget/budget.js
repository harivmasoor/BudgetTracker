import React, { useState } from 'react';
import CreateBudget from './createBudget';
import ListBudget from './listBudget';
import Modal from '../Modal/Modal';
function Budget() {
  const [selectedInterval, setSelectedInterval] = useState('monthly'); // Default value is 'monthly'
  const [timeFrame, setTimeFrame] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleTimeFrameChange = (e) => {
    setTimeFrame(e.target.value);
  };

  return (
    <div>
    <Modal showModal={showModal} closeModal={closeModal}>
      <CreateBudget selectedInterval={selectedInterval} />
    </Modal>

    <div className="budgets-page-container">
    <button onClick={openModal}>Add New Budget plan</button>
    <div>
        <label htmlFor="timeFrame">Select Time Frame: </label>
          <select id="timeFrame" value={timeFrame} onChange={handleTimeFrameChange}>
            <option value="all">All</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      <ListBudget timeFrame={timeFrame} />

    </div>
    </div>
  );
}

export default Budget;
