import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchIncomes, deletedIncome, updateIncome } from '../../store/incomes';
import { fetchIncomeCategories } from '../../store/incomeCategories';
import './Income.css';
import { formattedDate } from '../../Util/dateUtil';
import  IncomeCategoryIcons  from './IncomeCategoryIcons'


function IncomeList({setIsLoading}) {
  const incomes = useSelector(state => state.incomes.income);
  const incomeCategories = useSelector(state => state.incomeCategories);
  const dispatch = useDispatch();
  const [timeFrame, setTimeFrame] = useState("all"); // default to 'all'
  const [isEditing, setIsEditing] = useState(false);
  const [currentIncome, setCurrentIncome] = useState(null);

  // useEffect(() => {
    
  // }, [dispatch]);

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
    
    
    const fn = async () => {
      await dispatch(fetchIncomes(startDate, endDate));
      await dispatch(fetchIncomeCategories());
      setIsLoading(false);
    }
    fn();
  }, [dispatch, timeFrame]);

  const handleDeleteIncome = (incomeId) => {
    dispatch(deletedIncome(incomeId));
  };

  const handleTimeFrameChange = (e) => {
    setTimeFrame(e.target.value);
  };
  const handleEditIncome = (income) => {
    setIsEditing(true);
    setCurrentIncome(income);
  };

  const handleUpdateIncome = async (e) => {
    e.preventDefault();
    const updatedData = {
      notes: e.target.notes.value,
    };
    await dispatch(updateIncome(currentIncome._id, updatedData));
    setIsEditing(false);
    setCurrentIncome(null);
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
                <span key={filteredCategory._id}>
                    {filteredCategory.name}
                    {IncomeCategoryIcons[filteredCategory.name] && (
                        <img 
                            src={IncomeCategoryIcons[filteredCategory.name]} 
                            alt={`${filteredCategory.name} Icon`} 
                            style={{ width: '20px', height: '20px', marginLeft: '10px' }} 
                        />
                    )}
                </span>
            )): 'N/A'}
          </p>
          <p><strong>Date:</strong> {formattedDate(income.date)}</p>
          <button onClick={() => handleDeleteIncome(income._id)}>Delete</button>
          <button onClick={() => handleEditIncome(income)}>Edit</button>
          {isEditing && currentIncome._id === income._id && (
            <form onSubmit={handleUpdateIncome}>
              <textarea name="notes" defaultValue={income.notes}></textarea>
              <button type="submit">Update</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </form>
          )}
          <hr />
        </div>
      ))}
    </div>
  );
}

export default IncomeList;
