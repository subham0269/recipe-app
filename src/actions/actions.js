export const ADD_FAV = 'ADD_FAV';
export const REMOVE_FAV = 'REMOVE_FAV';

export const addToFavAction = (ob) => ({type: ADD_FAV, payload: ob})
export const RemoveFromFavAction = (id) => ({type: REMOVE_FAV, payload: id})