import React, { useState } from 'react';
import LoginForm from '../SessionForms/LoginForm';
import SignupForm from '../SessionForms/SignupForm';
import Modal from '../Modal/Modal';
import './MainPage.css';
import bblogo from '../../assets/bblogo.jpg';
import background from '../../assets/floor899.mp4';



function MainPage() {
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState('login');
  

  const openModal = (type) => {
    setFormType(type);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const toggleFormType = () => {
    setFormType(prevType => prevType === 'login' ? 'signup' : 'login');
  };

  return (
    <>
    <div className="top-image-container">
      <img className="top-image" src={bblogo} alt="main-logo" />
      <button className="open-modal-button left" onClick={() => openModal('login')}>Log In</button>
      <button className="open-modal-button right" onClick={() => openModal('signup')}>Sign Up</button>
    </div>
      <video className="background-video" autoPlay loop muted>
        <source src={background} type="video/mp4" />
      </video>


      <Modal showModal={showModal} closeModal={closeModal}>
        {formType === 'login' ? <LoginForm /> : <SignupForm />}
        {/* <button id="toggleButton" className="toggle-button" onClick={toggleFormType}>
          {formType === 'login' ? 'Don`t have an account? Please Register' : 'Already have an account? Login'}
        </button> */}
      </Modal>
     </>
  );
}

export default MainPage;
