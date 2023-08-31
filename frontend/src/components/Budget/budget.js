import React, { useState } from 'react';
import CreateBudget from './createBudget';
import ListBudget from './listBudget';
function Budget() {
  const [selectedInterval, setSelectedInterval] = useState('monthly'); // Default value is 'monthly'
  const [timeFrame, setTimeFrame] = useState("all");
  const handleTimeFrameChange = (e) => {
    setTimeFrame(e.target.value);
  };

  return (
    <div className="budgets-page-container">
      <label htmlFor="timeFrame">Select Time Frame: </label>
      <select id="timeFrame" value={timeFrame} onChange={handleTimeFrameChange}>
        <option value="all">All</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>

      <CreateBudget selectedInterval={selectedInterval} />
      <ListBudget timeFrame={timeFrame} />

      {/* ... Rest of your code ... */}
    </div>
  );
}

export default Budget;

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchBudgets, createBudget, deleteBudget } from '../../store/budget';
// import { fetchCategories } from '../../store/categories';
// import UpdateBudgetModal from './updateBudget';
// import BudgetPieChart from './budgetpieChart';
// import './Budget.css';
// import { formattedDate } from '../../Util/dateUtil';

// function Budget() {
//   const dispatch = useDispatch();
//   const budgets = useSelector(state => state.budget); 
//   const currentUser = useSelector(state => state.session.user);
//   const categories = useSelector(state => state.categories)
//   const [showUpdateModal, setShowUpdateModal] = useState(false);
//   const [selectedBudget, setSelectedBudget] = useState(null);
//   const [selectedInterval, setSelectedInterval] = useState('monthly'); // Default value is 'monthly'
//   const [timeFrame, setTimeFrame] = useState("all");
//   // console.log(currentUser._id)
  
//   const handleOpenUpdateModal = (budget) => {
//     setSelectedBudget(budget);
//     setShowUpdateModal(true);
//   };
  
//   function getCurrentMonthYear(selectedInterval, dateInput) {
//     // Get the current year and month
//     const newDate = new Date(dateInput)
//     const currentYear = newDate.getFullYear();
//     const currentMonth = newDate.getMonth();
//     // Calculate the start and end dates of the current month
//     let startDate = new Date(currentYear, currentMonth, 1);
//     let endDate = new Date(currentYear, currentMonth + 1, 0);
//     if(selectedInterval === "monthly") {
//       startDate = new Date(currentYear, currentMonth, 1);
//       endDate = new Date(currentYear, currentMonth + 1, 0);
//     }else{
//       startDate = new Date(currentYear, 0, 1);
//       endDate = new Date(currentYear +1, 0, 0);
//     }
//     return {
//       startDate: startDate.toISOString().split('T')[0],
//       endDate: endDate.toISOString().split('T')[0]
//     };
//   }
//   const handleCloseUpdateModal = () => {
//     setSelectedBudget(null);
//     setShowUpdateModal(false);
//   };
  
//   const [newBudget, setNewBudget] = useState({
//     budgetAmount: '',
//     budgetPlan: selectedInterval,
//     notes: '',
//     category: categories.length > 0 ? categories[0]._id : '',
//     date: '',
//     user: currentUser._id,
//     endDate: selectedInterval,
//     startDate:''
//   });

//   let startDate, endDate;
//     const today = new Date();
//     endDate = today.toISOString().split('T')[0]; // current date

//     switch (timeFrame) {
//       case 'daily':
//         startDate = today.toISOString().split('T')[0];
//         break;
//       case 'weekly':
//         const lastWeek = new Date(today);
//         lastWeek.setDate(today.getDate() - 7);
//         startDate = lastWeek.toISOString().split('T')[0];
//         break;
//       case 'monthly':
//         const lastMonth = new Date(today);
//         lastMonth.setMonth(today.getMonth() - 1);
//         startDate = lastMonth.toISOString().split('T')[0];
//         break;
//       default:
//         startDate = undefined;
//         endDate = undefined;
//     }
  
//   const handleFetchBudgets = () => {
//     dispatch(fetchBudgets(startDate, endDate));
//   };
  


//   const handleCreateBudget = () => {
//     const {startDate, endDate} = getCurrentMonthYear(selectedInterval, newBudget.date)
//     dispatch(createBudget({...newBudget, endDate,startDate, budgetPlan: selectedInterval}));
//     setNewBudget({
//       budgetAmount: 0,
//       budgetPlan: '',
//       notes: '',
//       date:'',
//       category:'',
//       user: currentUser._id,
//       endDate: selectedInterval,
//       startDate:''
//       // Other properties
//     });
//   };
//   const getRemainingDaysPercent = (startDate, endDate, maxWidth) => {
//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     const now = new Date();
//     const totalDays = (end - start) / (1000 * 60 * 60 * 24);
//     const elapsedDays = (now - start) / (1000 * 60 * 60 * 24);
//     let remainingDaysPercent = ((totalDays - elapsedDays) / totalDays) * 100;
  
//     // Ensure the black line doesn't go off the bar
//     if (remainingDaysPercent < 0) {
//       remainingDaysPercent = 0;
//     } else if (remainingDaysPercent > maxWidth) {
//       remainingDaysPercent = maxWidth;
//     }
  
//     return remainingDaysPercent;
//   };
  


//   useEffect(() => {
//     handleFetchBudgets();
//     dispatch(fetchCategories());
//   }, [dispatch, timeFrame]);
  
//   const handleDeleteBudget = (budgetId) => {
//     dispatch(deleteBudget(budgetId));
//   };
  
//   const handleTimeFrameChange = (e) => {
//     setTimeFrame(e.target.value);
//   };
  
//   return (
//     <div className="budgets-page-container">
//       <label htmlFor="timeFrame">Select Time Frame: </label>
//       <select id="timeFrame" value={timeFrame} onChange={handleTimeFrameChange}>
//         <option value="all">All</option>
//         <option value="daily">Daily</option>
//         <option value="weekly">Weekly</option>
//         <option value="monthly">Monthly</option>
//       </select>
//         <ul>
//         {budgets.map((budget) => (
//           <li key={budget._id}>
//             <div>Budget Amount: {budget.budgetAmount}</div>
//             <div>Remaining Amount: {budget.remainingAmount}</div>
//             <div>Budget Plan: {budget.budgetPlan}</div>
//             <div>Budget Category: {categories.filter(category => category._id === budget.category).map(filteredCategory => filteredCategory.name)}</div>
//             <div>Notes: {budget.notes}</div>
//             <div>Date: {formattedDate(budget.date)}</div>
//             <div>EndDate: {formattedDate(budget.endDate)}</div>
//             <div style={{ position: 'relative', width: '200px', height: '20px', backgroundColor: 'lightgray' }}>
//               {/* Budget bar */}
//               <div style={{ 
//                 width: `${(budget.remainingAmount / budget.budgetAmount) * 100}%`, 
//                 height: '100%', 
//                 backgroundColor: 'green' 
//               }}></div>
//               {/* Remaining Days bar */}
//               <div style={{
//                 position: 'absolute',
//                 top: 0,
//                 left: `${getRemainingDaysPercent(budget.startDate, budget.endDate, 100)}%`, // 100% is the max width
//                 width: '2px',
//                 height: '100%',
//                 backgroundColor: 'black'
//               }}></div>
//             </div>

//             {/* Other properties */}
//             <button onClick={() => handleOpenUpdateModal(budget)}>Update</button>
//             <button onClick={() => handleDeleteBudget(budget._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//       <h2>Add New Budget</h2>
//       <div>
//         <label>
//           Budget Amount:
//           <input
//             type="number"
//             value={newBudget.budgetAmount}
//             onChange={(e) =>
//               setNewBudget({ ...newBudget, budgetAmount: e.target.value })
//             }
//             required
//             />
//         </label>
//         <label>
//           Date:
//           <input
//             type="date"
//             value={newBudget.date}
//             onChange={(e) =>
//               setNewBudget({ ...newBudget, date: e.target.value })
//             }
//             />
//         </label>
//         <label>
//           Budget Note:
//           <input
//             type="string"
//             value={newBudget.notes}
//             onChange={(e) =>
//               setNewBudget({ ...newBudget, notes: e.target.value })
//             }
//             />
//         </label>
//         <label>
//           Budget Category:
//           <select 
//           id="category" 
//           name="category" 
//           value={newBudget.category} 
//           onChange={(e) =>
//             setNewBudget({ ...newBudget, category: e.target.value })
//           }
//           >
//           <option value="" disabled>Select a category</option>
//           {categories.map((category, index) => (
//             <option key={index} value={category._id}>{category.name}</option>
//             ))}
//         </select>
//         </label>
//         <label>
//             Select Planning Interval:
//             <select
//               value={selectedInterval}
//               onChange={(e) => setSelectedInterval(e.target.value)}
//               >
//               <option value="monthly">Monthly</option>
//               <option value="yearly">Yearly</option>
//             </select>
//           </label>
//         {/* Other input fields */}
//         <button onClick={handleCreateBudget}>Add Budget</button>
//       </div>
//       {showUpdateModal && (
//         <UpdateBudgetModal budget={selectedBudget} categories={categories} closeModal={handleCloseUpdateModal}/>
//         )}
//         <BudgetPieChart/>
//     </div>
//   );
//       }
//   export default Budget;

