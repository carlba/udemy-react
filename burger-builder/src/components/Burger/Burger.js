import React from 'react';
import PropTypes from 'prop-types';

import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = props => {
  let multiIngredientArray = Object.entries(props.ingredients).reduce((acc, [key, amount]) => {
    const ingredientElements = [...Array(amount)].map((_, index) => (
      <BurgerIngredient key={`${key}-${index}`} type={key} />
    ));
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
    salad: PropTypes.number,
    bacon: PropTypes.number,
    cheese: PropTypes.number,
    meat: PropTypes.number
  })
};

export default Burger;
