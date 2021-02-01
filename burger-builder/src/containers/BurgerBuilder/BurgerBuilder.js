import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4
  };

  addIngredientHandler = type => {
    const updatedCount = this.state.ingredients[type] + 1;
    const updatedState = {
      ingredients: { ...this.state.ingredients, [type]: updatedCount },
      totalPrice: this.state.totalPrice + INGREDIENT_PRICES[type]
    };
    this.setState(updatedState);
  };

  removeIngredientHandler = type => {
    if (this.state.ingredients[type] <= 0) {
      return;
    }
    const updatedCount = this.state.ingredients[type] - 1;
    const updatedState = {
      ingredients: { ...this.state.ingredients, [type]: updatedCount },
      totalPrice: this.state.totalPrice - INGREDIENT_PRICES[type]
    };
    this.setState(updatedState);
  };

  render() {
    const disabledInfo = Object.entries(this.state.ingredients).reduce((acc, [key, value]) => {
      return { ...acc, [key]: value <= 0 };
    }, {});
    console.log('disabledInfo', disabledInfo);
    return (
      <React.Fragment>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabledInfo={disabledInfo}
          price={this.state.totalPrice}
        ></BuildControls>
      </React.Fragment>
    );
  }
}

export default BurgerBuilder;
