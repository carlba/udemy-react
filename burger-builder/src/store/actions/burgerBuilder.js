import * as actionTypes from './actionsTypes';

export const addIngredient = name => ({ type: actionTypes.ADD_INGREDIENT, name });
export const removeIngredient = name => ({ type: actionTypes.REMOVE_INGREDIENT, name });
