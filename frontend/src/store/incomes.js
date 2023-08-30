import jwtFetch from './jwt.js';

export const ADD_INCOME = 'incomes/ADD_INCOME';
export const FETCH_INCOMES = 'incomes/FETCH_INCOMES';

export const addIncomeAction = (income) => ({
    type: ADD_INCOME,
    payload: income
  });
  
  export const fetchIncomesAction = (incomes) => ({
    type: FETCH_INCOMES,
    payload: incomes
  });

  export const addIncome = (incomeData) => {
    return async (dispatch, getState) => {
      const state = getState();
      const user = state.session.user;
  
      const response = await jwtFetch('/api/incomes', {
        method: "POST",
        body: JSON.stringify({
          ...incomeData,
          user: user._id
        })
      });
  
      const data = await response.json();
      dispatch(addIncomeAction(data));
    };
  };
  
  export const fetchIncomes = () => {
    return async (dispatch) => {
      const response = await jwtFetch('/api/incomes');
      const data = await response.json();
      dispatch(fetchIncomesAction(data));
    };
  };
  

  const initialState = [];

  const incomesReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_INCOME:
        return [...state, action.payload];
      case FETCH_INCOMES:
        return action.payload;
      default:
        return state;
    }
  };
  
  export default incomesReducer;
  