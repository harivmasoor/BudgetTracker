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
      <button onClick={openModal}>Add New Expenses</button>
      <Modal showModal={showModal} closeModal={closeModal}>
        <ExpenseInput />
      </Modal>
    <div className="expenses-page-container">
      <h2>Your Expenses</h2>
      <ExpensePieChart />
      <ExpenseList />
    </div>
    </div>
  );
}

export default ExpensesPage;
