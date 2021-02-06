import * as actionTypes from './actionsTypes';

import axiosOrders from '../../axios-orders';

export const addIngredient = name => ({ type: actionTypes.ADD_INGREDIENT, name });
export const removeIngredient = name => ({ type: actionTypes.REMOVE_INGREDIENT, name });

export const setIngredients = ingredients => {
  return { type: actionTypes.SET_INGREDIENTS, ingredients };
};

export const fetchIngredientsFailed = () => {
  return { type: actionTypes.FETCH_INGREDIENTS_FAILED };
};

export const initIngredients = () => {
  return async dispatch => {
    try {
      const response = await axiosOrders.get(
        'https://udemy-react-burger-build-default-rtdb.firebaseio.com/ingredients.json'
      );
      dispatch(setIngredients(response.data));
    } catch (err) {
      console.log('Error on getting ingredients');
      dispatch(fetchIngredientsFailed());
    }
  };
};
