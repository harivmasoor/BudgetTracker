import React from 'react';
import IncomeInput from './incomeInput';
import IncomeList from './incomeList';
import IncomePieChart from './incomePieChart';
import Modal from '../Modal/Modal';
import { useState } from 'react';
import './Income.css';

function IncomesPage() {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="incomes-page-container" id='stt1'>
      <h2>Your Income</h2>
      <button onClick={openModal}>Add New Income</button>  {/* Button to open the modal */}
      <Modal showModal={showModal} closeModal={closeModal}>
        <IncomeInput closeModal={closeModal} setIsLoading={setIsLoading}/>
      </Modal>
      <div className="income-container" id='i-list'>
        <div id='income-list'>
          <IncomeList setIsLoading={setIsLoading} />
        </div>
        <div id='income-chart'>
          <IncomePieChart />
        </div>
      </div>
    </div>
  );
}

export default IncomesPage;
