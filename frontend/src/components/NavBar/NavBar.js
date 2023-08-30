import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../../store/session';

function NavBar() {
  const loggedIn = useSelector(state => !!state.session.user);
  const dispatch = useDispatch();
  const location = useLocation();

  const logoutUser = e => {
    e.preventDefault();
    dispatch(logout());
  }

  const getLinks = () => {
    if (loggedIn && location.pathname !== '/') {
      return (
        <div className="links-nav">
          <Link to={'/'}>Home</Link>
          <Link to={'/incomes'}>Incomes</Link>
          <Link to={'/expenses'}>Expenses</Link>
          <Link to={'/budget'}>Budget</Link>
          <Link to={'/profile'}>Profile</Link>
          <Link to={'/'} onClick={logoutUser}>Logout</Link>
        </div>
      );
    }
  }

  return (
    <>
      { getLinks() }
    </>
  );
}

export default NavBar;
