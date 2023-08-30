import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; // Import Link
import LoginForm from '../SessionForms/LoginForm';
import SignupForm from '../SessionForms/SignupForm';
import Modal from '../Modal/Modal';
import './MainPage.css';
import bblogo from '../../assets/bblogo.jpg';
import background from '../../assets/floor899.mp4';

function MainPage() {
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState('login');
  
  const loggedIn = useSelector(state => !!state.session.user);

  const openModal = (type) => {
    setFormType(type);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <>
    <div className="main-page">
      <div className="top-image-container">
        <img className="top-image" src={bblogo} alt="main-logo" />
        {loggedIn ? (
          <>
            <Link to="/instructions" className="open-modal-button left">Instruction</Link>
            <Link to="/contact" className="open-modal-button right">Contact Us</Link>
          </>
        ) : (
          <>
            <button className="open-modal-button left" onClick={() => openModal('login')}>Log In</button>
            <button className="open-modal-button right" onClick={() => openModal('signup')}>Sign Up</button>
          </>
        )}
      </div>
      <video className="background-video" autoPlay loop muted>
        <source src={background} type="video/mp4" />
      </video>

      <Modal showModal={showModal} closeModal={closeModal}>
        {formType === 'login' ? <LoginForm /> : <SignupForm />}
      </Modal>
    </div>
    </>
  );
}

export default MainPage;
