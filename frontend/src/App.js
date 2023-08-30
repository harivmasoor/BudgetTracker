import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/routes';
import NavBar from './components/NavBar/NavBar';
import MainPage from './components/MainPage/MainPage';
import Profile from './components/Profile/Profile';
import ExpenseInput from './components/Expenses/expenseInput';
import ExpenseList from './components/Expenses/expenseList';
import ExpensePieChart from './components/Expenses/expensePieChart';
import ExpensesPage from './components/Expenses/expensesPage';
import { getCurrentUser } from './store/session';
import Budget from './components/Budget/budget';
import './App.css';

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
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/expenses" component={ExpensesPage} />
        <ProtectedRoute exact path="/budget" component={Budget} />
      </Switch>
      <footer id="footer">
    <p>© 2023 by BudgetBuddy. All rights reserved.</p>
  </footer>
    </>
  );
}

export default App;
