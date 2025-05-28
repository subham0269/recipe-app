import { configureStore } from "@reduxjs/toolkit";
import favReducer from "./reducers/reducer";
import mealsReducer from "./reducers/mealReducer";

const store = configureStore({
    reducer: {
        favList: favReducer,
        meals: mealsReducer
    }
});


export default store;