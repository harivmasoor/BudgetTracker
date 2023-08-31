import jwtFetch from './jwt.js';

// Action Types
export const ADD_SAVINGS_GOAL = 'savings/ADD_SAVINGS_GOAL';
export const FETCH_SAVINGS_GOALS = 'savings/FETCH_SAVINGS_GOALS';

// Action Creators
export const addSavingsGoalAction = (savingsGoal) => ({
  type: ADD_SAVINGS_GOAL,
  payload: savingsGoal
});

export const fetchSavingsGoalsAction = (savingsGoals) => ({
  type: FETCH_SAVINGS_GOALS,
  payload: savingsGoals
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
    const response = await jwtFetch('/api/savings');
    const data = await response.json();
    dispatch(fetchSavingsGoalsAction(data));
  };
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
    default:
      return state;
  }
};

export default savingsGoalsReducer;
