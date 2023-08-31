import React from 'react';
import ExpenseInput from './expenseInput';
import ExpenseList from './expenseList';
import ExpensePieChart from './expensePieChart';
import Modal from '../Modal/Modal';
import { useState } from 'react';

function ExpensesPage() {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  return (
    <div>
      <Modal showModal={showModal} closeModal={closeModal}>
        <ExpenseInput />
      </Modal>
    <div className="expenses-page-container">
      <h2>Your Expenses</h2>
      <button onClick={openModal}>Add New Expenses</button>
      <div className="income-container">
        <div id='expense-list'>
          <ExpenseList />
        </div>
        <div id='expense-chart'>
          <ExpensePieChart />
        </div>
      </div>
    </div>
  </div>
  );
}

export default ExpensesPage;
