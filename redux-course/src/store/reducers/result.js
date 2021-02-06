import * as actions from '../actions/actions';

const initialState = {
  results: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.STORE_RESULT:
      return { ...state, results: state.results.concat({ id: new Date(), value: action.result }) };
    case actions.DELETE_RESULT:
      return { ...state, results: state.results.filter(result => result.id !== action.id) };
    default:
      return state;
  }
};

export default reducer;
