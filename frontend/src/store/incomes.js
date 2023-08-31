import jwtFetch from './jwt.js';

export const ADD_INCOME = 'incomes/ADD_INCOME';
export const FETCH_INCOMES = 'incomes/FETCH_INCOMES';
export const DELETE_INCOME = 'incomes/DELETE_INCOME';

export const FETCH_SAVINGS = 'incomes/FETCH_SAVINGS';

export const addIncomeAction = (income) => ({
    type: ADD_INCOME,
    payload: income
  });
  
  export const fetchIncomesAction = (incomes) => ({
    type: FETCH_INCOMES,
    payload: incomes
  });

  export const deleteIncomeAction = (deletedIncomeId) => ({
    type: DELETE_INCOME,
    deletedIncomeId
  });

  export const fetchSavingsAction = (Savings) => ({
    type: FETCH_SAVINGS,
    payload: Savings
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
  
  // export const fetchIncomes = () => {
  //   return async (dispatch) => {
  //     const response = await jwtFetch('/api/incomes');
  //     const data = await response.json();
  //     dispatch(fetchIncomesAction(data));
  //   };
  // };

  export const fetchIncomes = (startDate, endDate) => {
    return async (dispatch) => {
      let url = '/api/incomes';
  
      if (startDate && endDate) {
        url += `?startDate=${startDate}&endDate=${endDate}`;
      }
  
      const response = await jwtFetch(url);
      const data = await response.json();
      dispatch(fetchIncomesAction(data));
    };
  };
  
  export const deletedIncome = (deletedIncomeId) => async (dispatch) => {
    try {
    await jwtFetch(`/api/incomes/${deletedIncomeId}`, {
        method: 'DELETE'
    });

    dispatch(deleteIncomeAction(deletedIncomeId));
    } catch (error) {
    console.error('Error deleting income:', error);
    }
  };  

  export const fetchSavings = () => {
    return async (dispatch) => {
      const response = await jwtFetch('/api/incomes');
      const data = await response.json();
      dispatch(fetchIncomesAction(data));
    };
  };
  const initialState = {income:[],saving:[]};

  const incomesReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_INCOME:
        return { ...state, income: [...state.income, action.payload] };
      case FETCH_INCOMES:
        return { ...state, income: action.payload };
      case DELETE_INCOME:
        return {
          ...state,
          income: state.income.filter((income) => income._id !== action.deletedIncomeId)
        };
      default:
          return state;
      }
  };
  
  export default incomesReducer;
  