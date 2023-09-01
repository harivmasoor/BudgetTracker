// budgetActions.js
import jwtFetch from './jwt';
import { buildTimeFrame, getCurrentMonthYear } from '../Util/dateUtil';

// Action Types
export const FETCH_BUDGETS = 'budgets/FETCH_BUDGETS';
export const ADD_BUDGET = 'budgets/ADD_BUDGET';
export const UPDATE_BUDGET = 'budgets/UPDATE_BUDGET';
export const UPDATE_BUDGET_MONTH = 'budgets/UPDATE_BUDGET_MONTH';
export const UPDATE_BUDGET_YEAR = 'budgets/UPDATE_BUDGET_YEAR';
export const DELETE_BUDGET = 'budgets/DELETE_BUDGET';



// Action Creators
    export const fetchBudgetsAction = (budgets,timeFrames) => ({
    type: FETCH_BUDGETS,
    budgets,
    timeFrames
    });

    export const addBudgetAction = (budget,timeFrames) => ({
    type: ADD_BUDGET,
    budget,
    timeFrames
    });

    export const updateBudgetAction = (updatedBudget,type) => ({
        type: type,
        updatedBudget
    });

    export const deleteBudgetAction = (deletedBudgetId,timeFrames) => ({
        type: DELETE_BUDGET,
        deletedBudgetId,
        timeFrames
    });

    // Async Action Creator (using Redux Thunk)
    export const fetchBudgets = (timeFrame) => async (dispatch) => {
        let today = new Date();
        let startDate , endDate;
        if (timeFrame === 'monthly'){
            let returnObj = getCurrentMonthYear('monthly',today);
            startDate = returnObj.startDate;
            endDate = returnObj.endDate;
        }
        else if (timeFrame === 'yearly'){
            let returnObj = getCurrentMonthYear('yearly',today);
            startDate = returnObj.startDate;
            endDate = returnObj.endDate;
        }
    try {
        let url = '/api/budget';
  
        if (startDate && endDate) {
          url += `?startDate=${startDate}&endDate=${endDate}`;
        }
        const response = await jwtFetch(url);
        // const response = await jwtFetch('/api/budget'); // Fetch budgets using jwtFetch
        const budgets = await response.json();
        dispatch(fetchBudgetsAction(budgets,timeFrame));
    } catch (error) {
        console.error('Error fetching budgets:', error);
    }
    };

    export const createBudget = (budget) => async dispatch => {
        try {
        const res = await jwtFetch('/api/budget/', {
            method: 'POST',
            body: JSON.stringify(budget)
        });
            const budgetData = await res.json();
            let timeFrames=['all'];
            timeFrames.push(budget.budgetPlan);
            // const timeFrames = buildTimeFrame(budgetPlan)
            dispatch(addBudgetAction(budgetData,timeFrames));
        } catch(error) {
            console.error('Error creating budget:', error);
        }
    };


    export const updateBudget = (updatedData,type) => async (dispatch) => {
        try {
        const response = await jwtFetch(`/api/budget/${updatedData._id}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });
        const updatedBudget = await response.json();
        dispatch(updateBudgetAction(updatedBudget));
        } catch (error) {
        console.error('Error updating budget:', error);
        }
    };

    export const deleteBudget = (budgetId,timeFrame) => async (dispatch) => {
        try {
        await jwtFetch(`/api/budget/${budgetId}`, {
            method: 'DELETE'
        });
        let timeFrames=['all'];
        timeFrames.push(timeFrame);
        dispatch(deleteBudgetAction(budgetId,timeFrames));
        } catch (error) {
        console.error('Error deleting budget:', error);
        }
    };

    const initialState = {monthly:[],yearly:[],all:[]}
    
    
    const budgetReducer = (state = initialState, action) => {
        const { budget, timeFrames } = action;
        const updatedState = { ...state };
        switch (action.type) {
            case ADD_BUDGET:
                // Create a new budget object with timeFrames property
                const budgetWithTimeFrames = { ...budget, timeFrames };
          
                // Update the corresponding lists based on timeFrames
                timeFrames.forEach((timeFrame) => {
                //   updatedState[timeFrame].push(budgetWithTimeFrames);
                updatedState[timeFrame].push(budget);

                });
          
                return updatedState;
            case FETCH_BUDGETS:
                // Depending on the selected time frame, return the appropriate budget list
                if (timeFrames === 'monthly') {
                    return {...state,monthly:action.budgets};
                } else if (timeFrames === 'yearly') {
                    return {...state,yearly:action.budgets};
                } else {
                    return {...state,all:action.budgets};
                }
        // More cases for other actions
        case UPDATE_BUDGET:
        //     return state.map((budget) =>
        //     budget._id === action.updatedBudget._id ? action.updatedBudget : budget
        // );
            return {
                ...state,
                all: state.all.map((budget) =>
                budget._id === action.updatedBudget._id ? action.updatedBudget : budget
                )
            };
        case DELETE_BUDGET:
            // return state.filter((budget) => budget._id !== action.deletedBudgetId);
            const { deletedBudgetId } = action;
            // Loop through both time frames ('monthly' and 'yearly')
            timeFrames.forEach((timeFrame) => {
              updatedState[timeFrame] = updatedState[timeFrame].filter(
                (budget) => budget._id !== deletedBudgetId
              );
            });
          
            return updatedState;
        default:
            return state;
        }
    };
    
    export default budgetReducer;


