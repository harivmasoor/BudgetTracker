import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IncomePieChart from '../Incomes/incomePieChart';
import ExpensePieChart from '../Expenses/expensePieChart';
import BudgetPieChart from '../Budget/budgetpieChart';
import SavingsGoalPieChart from '../SavingsGoals/SavingsGoalPieChart';
import './Profile.css';
import { fetchExpenses } from '../../store/expenses';
import { fetchIncomes } from '../../store/incomes';
import { fetchCategories } from '../../store/categories';
import { fetchIncomeCategories } from '../../store/incomeCategories';
import { fetchBudgets } from '../../store/budget';

function Profile() {
  const [currentSection, setCurrentSection] = useState(0); // 0: Income, 1: Expenses, 2: Budget
  const currentUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const handleNext = () => {
    setCurrentSection(prev => (prev + 1) % 4);
  };

  const handlePrev = () => {
    setCurrentSection(prev => (prev - 1 + 4) % 4);
  };

  useEffect(() => {
    let startDate, endDate;
    const today = new Date();
    endDate = today.toISOString().split('T')[0]; // current date

    const lastMonth = new Date(today);
    lastMonth.setMonth(today.getMonth() - 1);
    startDate = lastMonth.toISOString().split('T')[0];

    dispatch(fetchBudgets('monthly','chart'));
    dispatch(fetchExpenses(startDate, endDate));
    dispatch(fetchIncomes(startDate, endDate));
    dispatch(fetchCategories());
    dispatch(fetchIncomeCategories());

  }, [dispatch]);

  return (
    <div className="profile-container">
      <h1 className="profile-header">Profile</h1>
      <p className="profile-username"><strong>Hello {currentUser.username}</strong></p>

      <div className="profile-section-container">
        
        <div className="header-buttons-container">
          <button onClick={handlePrev}>{"<"}</button>
          <h2>
            { currentSection === 0 && (<strong>Income</strong>) ||
              currentSection === 1 && (<strong>Expenses</strong>) ||
              currentSection === 2 && (<strong>Budget</strong>) ||
              currentSection === 3 && (<strong>Savings Goals</strong>)}
          </h2>
          <button onClick={handleNext}>{">"}</button>
        </div>

        <div className="profile-section-wrapper" style={{ transform: `translateX(-${currentSection * 100}%)` }}>
          <div className="profile-section">
            <h2 className="section-header">Income</h2>
            <IncomePieChart />
          </div>
          <div className="profile-section">
            <h2 className="section-header">Expenses</h2>
            <ExpensePieChart />
          </div>
          <div className="profile-section">
            <h2 className="section-header">Budget</h2>
            <BudgetPieChart />
          </div>
          <div className="profile-section">
            <h2 className="section-header">Savings Goals</h2>
            <SavingsGoalPieChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
