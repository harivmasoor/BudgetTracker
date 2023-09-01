import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchIncomes, deletedIncome } from '../../store/incomes';
import { fetchIncomeCategories } from '../../store/incomeCategories';
import './Income.css';
import { formattedDate } from '../../Util/dateUtil';
import disable from './IncomeAss/disabled-person.png';
import childSupport from './IncomeAss/childSupport.png';

function IncomeList() {
  const incomes = useSelector(state => state.incomes.income);
  const incomeCategories = useSelector(state => state.incomeCategories);
  const dispatch = useDispatch();
  const [timeFrame, setTimeFrame] = useState("all"); // default to 'all'

  useEffect(() => {
    dispatch(fetchIncomeCategories());
  }, [dispatch]);

  useEffect(() => {
    let startDate, endDate;
    const today = new Date();
    endDate = today.toISOString().split('T')[0]; // current date

    switch (timeFrame) {
      case 'daily':
        startDate = today.toISOString().split('T')[0];
        break;
      case 'weekly':
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7);
        startDate = lastWeek.toISOString().split('T')[0];
        break;
      case 'monthly':
        const lastMonth = new Date(today);
        lastMonth.setMonth(today.getMonth() - 1);
        startDate = lastMonth.toISOString().split('T')[0];
        break;
      default:
        startDate = undefined;
        endDate = undefined;
    }

    dispatch(fetchIncomes(startDate, endDate));

  }, [dispatch, timeFrame]);

  const handleDeleteIncome = (incomeId) => {
    dispatch(deletedIncome(incomeId));
  };

  const handleTimeFrameChange = (e) => {
    setTimeFrame(e.target.value);
  };

  if (!incomeCategories) return null;

  return (
    <div className="incomes-page-container">
      <label htmlFor="timeFrame">Select Time Frame: </label>
      <select id="timeFrame" value={timeFrame} onChange={handleTimeFrameChange}>
        <option value="all">All</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
      <hr />
      {incomes.map(income => (
        <div key={income._id}>
          <p><strong>Income Source:</strong> {income.incomesource}</p>
          <p><strong>Income Amount:</strong> ${income.incomeamount}</p>
          <p><strong>Notes:</strong> {income.notes}</p>
          <p>
            <strong>Category:</strong>
            {income.category ? incomeCategories.filter(category => 
    category._id === income.category).map(filteredCategory => (
    <>
        {filteredCategory.name}
        {filteredCategory.name === 'Disability Benefits' && (
            <img src={disable} alt="Disability Benefits Icon" style={{ width: '20px', height: '20px', marginLeft: '10px' }} />
        )}
        {filteredCategory.name === 'Child Support' && (
            <img src={childSupport} alt="Child Support Icon" style={{ width: '20px', height: '20px', marginLeft: '10px' }} />
        )}
    </>
)): 'N/A'}

          </p>
          <p><strong>Date:</strong> {formattedDate(income.date)}</p>
          <button onClick={() => handleDeleteIncome(income._id)}>Delete</button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default IncomeList;
