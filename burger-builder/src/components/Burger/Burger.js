import React from 'react';

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

export default Burger;
