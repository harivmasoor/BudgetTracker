// budgetActions.js
import jwtFetch from './jwt';

// Action Types
export const FETCH_BUDGETS = 'budgets/FETCH_BUDGETS';
export const ADD_BUDGET = 'budgets/ADD_BUDGET';
export const UPDATE_BUDGET = 'budgets/UPDATE_BUDGET';
export const DELETE_BUDGET = 'budgets/DELETE_BUDGET';

// Action Creators
    export const fetchBudgetsAction = (budgets) => ({
    type: FETCH_BUDGETS,
    budgets
    });

    export const addBudgetAction = (budget) => ({
    type: ADD_BUDGET,
    budget
    });

    export const updateBudgetAction = (updatedBudget) => ({
        type: UPDATE_BUDGET,
        updatedBudget
    });

    export const deleteBudgetAction = (deletedBudgetId) => ({
        type: DELETE_BUDGET,
        deletedBudgetId
    });

    // Async Action Creator (using Redux Thunk)
    export const fetchBudgets = () => async (dispatch) => {
    try {
        const response = await jwtFetch('/api/budget'); // Fetch budgets using jwtFetch
        const budgets = await response.json();
        dispatch(fetchBudgetsAction(budgets));
    } catch (error) {
        console.error('Error fetching budgets:', error);
    }
    };

    export const createBudget = budget => async dispatch => {
        try {
          const res = await jwtFetch('/api/budget/', {
            method: 'POST',
            body: JSON.stringify(budget)
          });
          const budgetData = await res.json();
          dispatch(addBudgetAction(budgetData));
        } catch(error) {
            console.error('Error creating budget:', error);
        }
      };


    export const updateBudget = (updatedData) => async (dispatch) => {
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

    export const deleteBudget = (budgetId) => async (dispatch) => {
        try {
        await jwtFetch(`/api/budget/${budgetId}`, {
            method: 'DELETE'
        });
    
        dispatch(deleteBudgetAction(budgetId));
        } catch (error) {
        console.error('Error deleting budget:', error);
        }
    };

    const initialState = []
    
    
    const budgetReducer = (state = initialState, action) => {
        switch (action.type) {
        case FETCH_BUDGETS:
            return action.budgets;
        case ADD_BUDGET:
            return [...state, action.budget];
        // More cases for other actions
        case UPDATE_BUDGET:
            return state.map((budget) =>
            budget._id === action.updatedBudget._id ? action.updatedBudget : budget
        );
        case DELETE_BUDGET:
            return state.filter((budget) => budget._id !== action.deletedBudgetId);
        default:
            return state;
        }
    };
    
    export default budgetReducer;


