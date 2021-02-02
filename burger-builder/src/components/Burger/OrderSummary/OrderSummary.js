import React from 'react';

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
      <button>CANCEL</button>
      <button>CONTINUE</button>
    </React.Fragment>
  );
};

export default OrderSummary;
