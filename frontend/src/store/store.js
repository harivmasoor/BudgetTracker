import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import errors from './errors';
import expenses from './expenses';
import incomes from './incomes';
import categories from './categories'; 
import incomeCategories from './incomeCategories'; 
import budgetReducer from './budget';
import savingsGoalsReducer from './savingsGoal';

const rootReducer = combineReducers({
  session,
  errors,
  expenses,
  categories,
  incomes,
  incomeCategories,
  budget: budgetReducer,
  savingsGoal: savingsGoalsReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;