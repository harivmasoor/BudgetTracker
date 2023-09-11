import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom'; 
import './SessionForm.css';
import { signup, clearSessionErrors } from '../../store/session';

function SignupForm () {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();
  const CurrentUser = useSelector(state => state.session.user);


  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = field => {
    let setState;

    switch (field) {
      case 'email':
        setState = setEmail;
        break;
      case 'username':
        setState = setUsername;
        break;
      case 'password':
        setState = setPassword;
        break;
      case 'password2':
        setState = setPassword2;
        break;
      default:
        throw Error('Unknown field in Signup Form');
    }

    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email,
      username,
      password
    };
    const success = await dispatch(signup(user));
    if (success) {
      setShouldRedirect(true);
    }
  };

  if (CurrentUser) {
    return <Redirect to="/profile" />;
  }

  return (
    <form className="session-form" onSubmit={handleSubmit}>
      <h2>Sign Up Form</h2>
      <div className="errors">{errors?.email}</div>
      <label>
        <span>Email</span>
        <input type="text"
          value={email}
          onChange={update('email')}
          placeholder="Email"
        />
      </label>
      <div className="errors">{errors?.username}</div>
      {/* {username.length < 3 && username && 'Username must be at least 3 characters'} */}
      <label>
        <span>Username</span>
        <input type="text"
          value={username}
          onChange={update('username')}
          placeholder="Username"
        />
      </label>
      <div className="errors">{errors?.password}</div>
      {/* {!isValidEmail(email) && email && 'Invalid email format'} */}
      {/* {password.length < 6 && password && 'Password must be at least 6 characters'} */}
      <label>
        <span>Password</span>
        <input type="password"
          value={password}
          onChange={update('password')}
          placeholder="Password"
        />
      </label>
      <div className="errors">
        {password !== password2 && 'Confirm Password field must match'}
      </div>
      <label>
        <span>Confirm Password</span>
        <input type="password"
          value={password2}
          onChange={update('password2')}
          placeholder="Confirm Password"
        />
      </label>
      <input
        type="submit"
        value="Sign Up"
        disabled={
          // !isValidEmail(email) ||
          // username.length < 3 ||
          // password.length < 6 ||
          password !== password2
        }
      />
    </form>
  );
}

export default SignupForm;
