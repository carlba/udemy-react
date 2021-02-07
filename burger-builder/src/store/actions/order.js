import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';

import { convertObjectToArray } from '../../utils/utils';

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

export const orderBurger = (data, token) => {
  return async dispatch => {
    dispatch(orderBurgerStart());
    try {
      const response = await axios.post(`/orders.json?auth=${token}`, data);
      dispatch(orderBurgerSuccess(response.data.name, data));
    } catch (error) {
      console.log('Error while posting order', error);
      dispatch(orderBurgerFail(error));
    }
  };
};

export const orderBurgerInit = () => ({ type: actionTypes.ORDER_BURGER_INIT });

export const fetchOrdersSuccess = orders => {
  return { type: actionTypes.FETCH_ORDERS_SUCCESS, orders };
};

export const fetchOrdersFail = error => {
  return { type: actionTypes.FETCH_ORDERS_FAIL, error };
};

export const fetchOrdersStart = () => {
  return { type: actionTypes.FETCH_ORDERS_START };
};

export const fetchOrders = (token, userId) => {
  return async dispatch => {
    dispatch(fetchOrdersStart());
    try {
      const response = await axios.get(
        `https://udemy-react-burger-build-default-rtdb.firebaseio.com/orders.json`,
        { params: { auth: token, orderBy: '"userId"', equalTo: `"${userId}"` } }
      );
      const orders = convertObjectToArray(response.data);

      dispatch(fetchOrdersSuccess(orders));
    } catch (error) {
      console.log('Error on getting orders', error);
      dispatch(fetchOrdersFail(error));
    }
  };
};
