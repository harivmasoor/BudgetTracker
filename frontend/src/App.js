import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/routes';
import NavBar from './components/NavBar/NavBar';
import MainPage from './components/MainPage/MainPage';
import Profile from './components/Profile/Profile';
import ExpensesPage from './components/Expenses/expensesPage';
import IncomesPage from './components/Incomes/incomePage';
import { getCurrentUser } from './store/session';
import Budget from './components/Budget/budget';
import InstructionPage from './components/Instruction/InstructionPage';
import ContactUsPage from './components/ContactUs/ContactUsPage';
import './App.css';
import SavingsGoalForm from './components/SavingsGoals/savingsGoalForm';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <>
      <NavBar />
      <Switch>
        <AuthRoute exact path="/" component={MainPage} />
        <ProtectedRoute exact path="/instructions" component={InstructionPage} />
        <ProtectedRoute exact path="/contact" component={ContactUsPage} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/expenses" component={ExpensesPage} />
        <ProtectedRoute exact path="/incomes" component={IncomesPage} />
        <ProtectedRoute exact path="/budget" component={Budget} />
        <ProtectedRoute exact path="/savingGoals" component={SavingsGoalForm} />
        <Redirect to="/" />
      </Switch>
      <footer id="footer">
        <p>© 2023 by BudgetBuddy. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;
