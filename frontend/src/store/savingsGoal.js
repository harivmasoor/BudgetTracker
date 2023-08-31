import jwtFetch from './jwt.js';

// Action Types
export const ADD_SAVINGS_GOAL = 'savings/ADD_SAVINGS_GOAL';
export const FETCH_SAVINGS_GOALS = 'savings/FETCH_SAVINGS_GOALS';
export const UPDATE_SAVING_GOAL = 'savings/UPDATE_SAVING_GOAL';

// Action Creators
export const addSavingsGoalAction = (savingsGoal) => ({
  type: ADD_SAVINGS_GOAL,
  payload: savingsGoal
});

export const fetchSavingsGoalsAction = (savingsGoals) => ({
  type: FETCH_SAVINGS_GOALS,
  payload: savingsGoals
});

export const updateSavingGoalsAction = (updatedsavingGoal) => ({
    type: UPDATE_SAVING_GOAL,
    payload: updatedsavingGoal
  });
// Thunk Actions
export const addSavingsGoal = (savingsGoalData) => {
  return async (dispatch, getState) => {
    const state = getState();
    const user = state.session.user;

    const response = await jwtFetch('/api/savingsGoals', {
      method: "POST",
      body: JSON.stringify({
        ...savingsGoalData,
        user: user._id
      })
    });

    const data = await response.json();
    dispatch(addSavingsGoalAction(data));
  };
};

export const fetchSavingsGoals = () => {
  return async (dispatch) => {
    const response = await jwtFetch('/api/savingsGoals');
    const data = await response.json();
    dispatch(fetchSavingsGoalsAction(data));
  };
};

export const updateSavingsGoal = (updatedData) => async (dispatch) => {
    try {
    const response = await jwtFetch(`/api/savingsGoals/${updatedData._id}`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    });
    const updatedsavingGoal = await response.json();
    dispatch(updateSavingGoalsAction(updatedsavingGoal));
    } catch (error) {
    console.error('Error updating budget:', error);
    }
};

// Initial State
const initialState = [];

// Reducer
const savingsGoalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SAVINGS_GOAL:
      return [...state, action.payload];
    case FETCH_SAVINGS_GOALS:
      return action.payload;
    case UPDATE_SAVING_GOAL:
        return state.map((savingsGoal) =>
        savingsGoal._id === action.updatedsavingGoal._id ? action.updatedsavingGoal : savingsGoal
    );
    default:
      return state;
  }
};

export default savingsGoalsReducer;
