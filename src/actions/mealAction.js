import fetchRandomRecipeData from "../utils/fetchData";

export const ADD_MEAL = 'ADD_MEAL';
// export const REMOVE_FAV = 'REMOVE_FAV';



export const fetchMeals = () => {
    return async (dispatch) => {
        
        console.log('fetch meals called');
        const data = await fetchRandomRecipeData();
        dispatch({ type: ADD_MEAL, payload: data });
    }
}