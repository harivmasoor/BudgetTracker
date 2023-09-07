// budgetActions.js
import jwtFetch from './jwt';
// Action Types
export const FETCH_CATEGORIES = 'categories/FETCH_CATEGORIES';
// Action Creators
    export const fetchCategoriesAction = (categories) => ({
    type: FETCH_CATEGORIES,
    categories
    });
    // Async Action Creator (using Redux Thunk)
    export const fetchCategories = () => async (dispatch) => {
    try {
        const response = await jwtFetch('/api/categories'); // Fetch categories using jwtFetch
        const budgets = await response.json();
        return dispatch(fetchCategoriesAction(budgets));
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
    };
    const initialState = []
    const categoryReducer = (state = initialState, action) => {
        switch (action.type) {
        case FETCH_CATEGORIES:
            return action.categories;
        default:
            return state;
    };
}
    export default categoryReducer
