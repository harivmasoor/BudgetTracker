// budgetActions.js
import jwtFetch from './jwt';
// Action Types
export const FETCH_INCOMECATEGORIES = 'incomeCategories/FETCH_INCOMECATEGORIES';
// Action Creators
    export const fetchIncomeCategoriesAction = (incomeCategories) => ({
    type: FETCH_INCOMECATEGORIES,
    incomeCategories
    });
    // Async Action Creator (using Redux Thunk)
    export const fetchIncomeCategories = () => async (dispatch) => {
    try {
        const response = await jwtFetch('/api/incomeCategories'); // Fetch incomeCategories using jwtFetch
        const incomeCategories = await response.json();
        dispatch(fetchIncomeCategoriesAction(incomeCategories));
    } catch (error) {
        console.error('Error fetching incomeCategories:', error);
    }
    };
    const initialState = []
    const incomeCategoryReducer = (state = initialState, action) => {
        switch (action.type) {
        case FETCH_INCOMECATEGORIES:
            return action.incomeCategories;
        default:
            return state;
    };
}
    export default incomeCategoryReducer
