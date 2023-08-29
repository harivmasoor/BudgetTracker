import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from './components/Routes/routes';
import NavBar from './components/NavBar/NavBar';

import MainPage from './components/MainPage/MainPage';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';
import Profile from './components/Profile/Profile';
import UserMainForm from './components/UserFinanceForm/UserMainForm';
import { getCurrentUser } from './store/session';
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
        <ProtectedRoute exact path='/profile' component={Profile}/>
        <ProtectedRoute exact path="/mainform" component={UserMainForm} />
      </Switch>
      <footer id="footer">
    <p>© 2023 by BudgetBuddy. All rights reserved.</p>
  </footer>
    </>
  );
}

export default App;
