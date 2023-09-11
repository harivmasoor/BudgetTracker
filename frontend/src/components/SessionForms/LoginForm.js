import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForm.css';
import { login, clearSessionErrors, getCurrentUser } from '../../store/session';
import { Redirect } from 'react-router-dom';

function LoginForm () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();
  const CurrentUser = useSelector(state => state.session.user);


  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password })); 
  }

  const handleDemoUserLogin = () => {
    const demoUser = {
      email: 'demo@example.com',
      password: 'Demo!123'
    };
    setEmail('demo@example.com');
    setPassword('Demo!123')
    
    dispatch(login(demoUser));
  }

  if (CurrentUser) {
    return <Redirect to="/profile" />;
  }

  return (
    <form className="session-form" onSubmit={handleSubmit}>
      <h2>Log In Form</h2>
      <div className="errors">{errors?.email}</div>
      <label>
        <span>Email</span>
        <input type="text"
          value={email}
          onChange={update('email')}
          placeholder="Email"
        />
      </label>
      <div className="errors">{errors?.password}</div>
      <label>
        <span>Password</span>
        <input type="password"
          value={password}
          onChange={update('password')}
          placeholder="Password"
        />
      </label>
        
          <input id='demo'
            type="submit"
            value="Demo User"
            onClick={handleDemoUserLogin}
          />
  
          <input
            type="submit"
            value="Log In"
            // disabled={!email || !password}
          />
    </form>
  );
}

export default LoginForm;