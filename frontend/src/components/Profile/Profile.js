import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IncomePieChart from '../Incomes/incomePieChart';
import ExpensePieChart from '../Expenses/expensePieChart';
import BudgetPieChart from '../Budget/budgetpieChart';
import './Profile.css';

function Profile() {
  const [currentSection, setCurrentSection] = useState(0); // 0: Income, 1: Expenses, 2: Budget
  const currentUser = useSelector(state => state.session.user);

  const handleNext = () => {
    setCurrentSection(prev => (prev + 1) % 3);
  };
  
  const handlePrev = () => {
    setCurrentSection(prev => (prev - 1 + 3) % 3);
  };
  
  return (
    <div className="profile-container">
      <h1 className="profile-header">Profile</h1>
      <p className="profile-username"><strong>Hello {currentUser.username}</strong></p>
      
      <div className="profile-section-container">
        <button onClick={handlePrev}>{"<"}</button>
        { currentSection === 0 && (<strong>Income</strong>) ||
          currentSection === 1 && (<strong>Expenses</strong>) ||
          currentSection === 2 && (<strong>Budget</strong>)}
        <button onClick={handleNext}>{">"}</button>
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
        </div>
      </div>
    </div>
  );
}

export default Profile;
