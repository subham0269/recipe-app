import { ADD_FAV, REMOVE_FAV } from "../actions/actions";
import { addToLocalStorage, fetchFromLocalStorage, removeFromLocal } from "../utils/storage";

const initialState = fetchFromLocalStorage();


export default function favReducer(state = initialState, action) {
    switch(action.type) {
        case ADD_FAV: {
            const list = addToLocalStorage(action.payload);
            console.log('from reducer',list);
            return list;
        }

        case REMOVE_FAV: {
            console.log('remove reducer called', action.payload);
            const updatedListAfterRemoval = removeFromLocal(action.payload);
            console.log(updatedListAfterRemoval);
            return updatedListAfterRemoval
        }

        default:
            return state;
    }
}