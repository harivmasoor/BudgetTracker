// src/components/Profile/Profile.js

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { expensesPieChart } from '../../store/expenses';

function Profile () {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
}

export default Profile;