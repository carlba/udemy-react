import * as actionTypes from '../actions/actionsTypes';

const initialState = {
  orders: [],
  loading: false,
  isOrdered: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ORDER_BURGER_INIT:
      return { ...state, isOrdered: false };
    case actionTypes.ORDER_BURGER_START:
      return { ...state, loading: true };
    case actionTypes.ORDER_BURGER_SUCCESS:
      return {
        ...state,
        loading: false,
        isOrdered: true,
        orders: state.orders.concat({ ...action.data, id: action.id })
      };
    case actionTypes.ORDER_BURGER_FAIL:
      return { ...state, loading: false };
    case actionTypes.FETCH_ORDERS_START:
      return { ...state, loading: true };
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return { ...state, orders: action.orders, loading: false };
    case actionTypes.FETCH_ORDERS_FAIL:
      return { ...state, error: action.error.toString(), loading: false };
    default:
      return state;
  }
};

export default reducer;
