import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IncomePieChart from '../Incomes/incomePieChart';
import ExpensePieChart from '../Expenses/expensePieChart';
import BudgetPieChart from '../Budget/budgetpieChart';


function Profile () {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);

  return (
    <div>
      <h1>Profile</h1>
      <p>{currentUser.email}</p>
      <div>
        <h2>
          Income
        </h2>
        <IncomePieChart />
      </div>
      <div>
        <h2>
          Expenses
        </h2>
        <ExpensePieChart />
      </div>
      <div>
        <h2>
          Budget
        </h2>
        <BudgetPieChart/>
      </div>
    </div>
  )}


export default Profile;