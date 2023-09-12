import React from 'react';
import ExpenseInput from './expenseInput';
import ExpenseList from './expenseList';
import ExpensePieChart from './expensePieChart';
import Modal from '../Modal/Modal';
import { useState } from 'react';

function ExpensesPage() {
  // console.log('ExpensesPage');
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div>
      <Modal showModal={showModal} closeModal={closeModal}>
        <ExpenseInput closeModal={closeModal} setIsLoading={setIsLoading}/>
      </Modal>
    <div className="expenses-page-container">
      <h2>Your Expenses</h2>
      <button onClick={openModal}>Add New Expenses</button>
      <div className="income-container">
        <div id='expense-list'>
          <ExpenseList setIsLoading={setIsLoading} />
        </div>
        {!isLoading && (
                  <div id='expense-chart'>
                  <ExpensePieChart />
                </div>
        )}

      </div>
    </div>
  </div>
  );
}

export default ExpensesPage;
