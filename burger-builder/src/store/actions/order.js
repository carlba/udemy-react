import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';

export const orderBurgerSuccess = (id, data) => ({
  type: actionTypes.ORDER_BURGER_FAIL,
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
      console.log(response.data);
      dispatch(orderBurgerSuccess(response.data, data));
    } catch (error) {
      console.log('Error while posting order', error);
      dispatch(orderBurgerFail(error));
    }
  };
};
