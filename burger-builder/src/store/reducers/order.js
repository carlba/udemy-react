import * as actionTypes from '../actions/actionsTypes';

const initialState = {
  orders: [],
  loading: false
};

const reducer = () => (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ORDER_BURGER_START:
      return { ...state, loading: true };
    case actionTypes.ORDER_BURGER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: state.orders.concat({ ...action.data, id: action.id })
      };
    case actionTypes.ORDER_BURGER_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default reducer;
