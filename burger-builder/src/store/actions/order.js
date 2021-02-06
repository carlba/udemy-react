import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';

export const orderBurgerSuccess = (id, data) => ({
  type: actionTypes.ORDER_BURGER_SUCCESS,
  id,
  data
});

export const orderBurgerFail = error => ({
  type: actionTypes.ORDER_BURGER_FAIL,
  error
});

export const orderBurgerStart = () => {
  return { type: actionTypes.ORDER_BURGER_START };
};

export const orderBurger = data => {
  return async dispatch => {
    dispatch(orderBurgerStart());
    try {
      const response = await axios.post('/orders.json', data);
      dispatch(orderBurgerSuccess(response.data.name, data));
    } catch (error) {
      console.log('Error while posting order', error);
      dispatch(orderBurgerFail(error));
    }
  };
};

export const orderBurgerInit = () => ({ type: actionTypes.ORDER_BURGER_INIT });
