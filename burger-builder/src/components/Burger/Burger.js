import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = props => {
  console.log('props including router stuff', props);
  let multiIngredientArray = Object.entries(props.ingredients).reduce((acc, [key, amount]) => {
    const ingredientElements = amount
      ? [...Array(amount)].map((_, index) => (
          <BurgerIngredient key={`${key}-${index}`} type={key} />
        ))
      : [];
    return [...acc, ...ingredientElements];
  }, []);

  if (multiIngredientArray.length === 0) {
    multiIngredientArray = <p>Please start adding ingredients</p>;
  }

  return (
    <div className={styles.Burger}>
      <BurgerIngredient type="bread-top" />
      {multiIngredientArray}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

Burger.propTypes = {
  ingredients: PropTypes.exact({
    salad: PropTypes.number.isRequired,
    bacon: PropTypes.number.isRequired,
    cheese: PropTypes.number.isRequired,
    meat: PropTypes.number.isRequired
  })
};

export default withRouter(Burger);
