import React, { useState } from 'react';
import LoginForm from '../SessionForms/LoginForm';
import SignupForm from '../SessionForms/SignupForm';
import Modal from '../Modal/Modal';
import './MainPage.css'; // Import your CSS for MainPage

function MainPage() {
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState('login');

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const toggleFormType = () => {
    setFormType(prevType => prevType === 'login' ? 'signup' : 'login');
  };

  return (
    <>
    <div className="top-image-container">
      <img className="top-image" src="/assets/bblogo.jpg" alt="main-logo" />
      <button id="openModalButton" className="open-modal-button" onClick={openModal}>Open Modal</button>
    </div>
      <video className="background-video" autoPlay loop muted>
        <source src="/assets/floor899.mp4" type="video/mp4" />
      </video>


      <Modal showModal={showModal} closeModal={closeModal}>
        <button id="toggleButton" className="toggle-button" onClick={toggleFormType}>
          {formType === 'login' ? 'Sign Up' : 'Log In'}
        </button>
        {formType === 'login' ? <LoginForm /> : <SignupForm />}
      </Modal>
    </>
  );
}

export default MainPage;
