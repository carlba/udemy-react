import * as actionTypes from '../actions/actionsTypes';

const initialState = {
  orders: [],
  loading: false,
  isOrdered: false
};

const reducer = (state = initialState, action) => {
  console.log('test', state);
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
    default:
      return state;
  }
};

export default reducer;
