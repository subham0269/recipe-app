import { ADD_MEAL } from "../actions/mealAction";
// import fetchRandomRecipeData from "../utils/fetchData";

const mealsInitState = {
    meals: [],
    mealsFetchInProgress: false,
    mealsFetchError: null,
};

export default function mealsReducer (state = mealsInitState, action) {
    switch (action.type) {
        case ADD_MEAL:
            // console.log('meal add', action.payload);
            return {...state,meals:[...action.payload]};
        default:
            return state;
    }
}