import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from './components/Routes/routes';
import NavBar from './components/NavBar/NavBar';

import MainPage from './components/MainPage/MainPage';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignUpForm';
import Profile from './components/Profile/Profile';
import ExpenseInput from './components/Expenses/expenseInput';
import ExpenseList from './components/Expenses/expenseList';
import ExpensePieChart from './components/Expenses/expensePieChart';
import ExpensesPage from './components/Expenses/expensesPage';
import IncomesPage from './components/Incomes/incomePage';

import { getCurrentUser } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);


  return loaded && (
    <>
      <NavBar />
      <Switch>
        <AuthRoute exact path="/" component={MainPage} />
        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/expenses" component={ExpensesPage} />
        <ProtectedRoute exact path="/incomes" component={IncomesPage} />

      </Switch>
    </>
  );
}

export default App;
