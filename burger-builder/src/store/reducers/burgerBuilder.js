import * as actions from '../actions/actionsTypes';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.name]: state.ingredients[action.name] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.name],
        building: true
      };
    case actions.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.name]: state.ingredients[action.name] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.name].ADD_INGREDIENT,
        building: true
      };
    case actions.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat
        },
        error: false,
        totalPrice: 4,
        building: false
      };
    case actions.FETCH_INGREDIENTS_FAILED:
      return { ...state, error: true };

    default:
      return state;
  }
};

export default reducer;
