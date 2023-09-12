import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../../store/session';
import menuLogo from '../../../src/assets/bblogotrans.ico';

function NavBar() {
  const loggedIn = useSelector(state => !!state.session.user);
  const dispatch = useDispatch();
  const location = useLocation();

  const logoutUser = e => {
    e.preventDefault();
    dispatch(logout());
  }
  if (loggedIn && location.pathname !== '/') {
  return (
    <nav className="menu-container">
    
      <input type="checkbox" aria-label="Toggle menu" />
      <span></span>
      <span></span>
      <span></span>


      <a href="/" className="menu-logo">
        <img src={menuLogo} alt="menu-logo"/>
      </a>

      <div className="menu">
        <ul>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/incomes">Incomes</Link>
          </li>
          <li>
            <Link to="/expenses">Expenses</Link>
          </li>
          <li>
            <Link to="/budget">Budget</Link>
          </li>
          <li>
            <Link to="/savingGoals">Savings Goals</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/" onClick={logoutUser}>Logout</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
  }
}

export default NavBar;
