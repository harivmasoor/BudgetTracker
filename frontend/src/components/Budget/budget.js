import React, { useState } from 'react';
import CreateBudget from './createBudget';
import ListBudget from './listBudget';
import Modal from '../Modal/Modal';
function Budget() {
  // const [selectedInterval, setSelectedInterval] = useState('monthly'); // Default value is 'monthly'
  const [chartTimeFrame, setChartTimeFrame] = useState("monthly");
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div>
    <Modal showModal={showModal} closeModal={closeModal}>
      <CreateBudget chartTimeFrame={chartTimeFrame} setChartTimeFrame={setChartTimeFrame} closeModal={closeModal} />
    </Modal>

    <div className="budgets-page-container">
    <h2>Your Budgets</h2>
    <button onClick={openModal}>Add New Budget plan</button>
      <ListBudget chartTimeFrame={chartTimeFrame} setChartTimeFrame={setChartTimeFrame}/>
    </div>
    </div>
  );
}

export default Budget;
