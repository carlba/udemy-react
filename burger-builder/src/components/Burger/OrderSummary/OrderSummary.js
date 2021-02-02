import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../ui/Button/Button';

const OrderSummary = props => {
  const ingredientSummary = Object.entries(props.ingredients).reduce(
    (acc, [ingredient, amount], index) => [
      ...acc,
      <li key={`${ingredient}-${index}`}>
        <span style={{ textTransform: 'capitalize' }}>{ingredient}</span>: {amount}
      </li>
    ],
    []
  );
  return (
    <React.Fragment>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to Checkout?</p>
      <Button buttonType="Danger" onClick={props.onOrderCancel}>
        CANCEL
      </Button>
      <Button buttonType="Success" onClick={props.onOrderContinue}>
        CONTINUE
      </Button>
    </React.Fragment>
  );
};

OrderSummary.propTypes = {
  ingredients: PropTypes.object,
  onOrderCancel: PropTypes.func,
  onOrderContinue: PropTypes.func
};

export default OrderSummary;
