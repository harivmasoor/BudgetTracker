import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addIncome } from '../../store/incomes';
import { fetchIncomeCategories } from '../../store/incomeCategories';
import './Income.css';


function IncomeInput() {
  const incomeCategories = useSelector(state => state.incomeCategories);
  const dispatch = useDispatch();
  const [incomeData, setIncomeData] = useState({
    incomesource: '', 
    incomeamount: '',  
    category: '', 
    notes:'',
    date:''
  });

  useEffect(() => {
    dispatch(fetchIncomeCategories());
  }, [dispatch]);

  const handleChange = (e) => {
    setIncomeData({
      ...incomeData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addIncome(incomeData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="incomesource">Income Source:</label>
        <input 
          type="text" 
          id="incomesource" 
          name="incomesource" 
          value={incomeData.incomesource} 
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="incomeamount">Income Amount($):</label>
        <input 
          type="number" 
          id="incomeamount" 
          name="incomeamount" 
          value={incomeData.incomeamount} 
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="notes">Notes:</label>
        <textarea 
          id="notes" 
          name="notes" 
          value={incomeData.notes} 
          onChange={handleChange}
        ></textarea>
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <select 
          id="category" 
          name="category" 
          value={incomeData.category} 
          onChange={handleChange}
        >
          <option value="" disabled>Select a category</option>
          {incomeCategories.map((category, index) => (
            <option key={index} value={category._id}>{category.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="incomedate">Date:</label>
        <input 
          type="date" 
          id="incomedate" 
          name="date" 
          value={incomeData.date} 
          onChange={handleChange}
        />
      </div>
      <button type="submit">Add Income</button>
    </form>
  );
}

export default IncomeInput;

