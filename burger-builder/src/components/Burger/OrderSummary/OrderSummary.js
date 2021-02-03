import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../ui/Button/Button';

class OrderSummary extends Component {
  // componentDidUpdate(nextProps) {
  //   console.log('nextProps', nextProps);
  //   return true;
  // }
  render() {
    const ingredientSummary = Object.entries(this.props.ingredients).reduce(
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
        <p>
          <strong>Total Price: {this.props.totalPrice.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button buttonType="Danger" onClick={this.props.onOrderCancel}>
          CANCEL
        </Button>
        <Button buttonType="Success" onClick={this.props.onOrderContinue}>
          CONTINUE
        </Button>
      </React.Fragment>
    );
  }
}

OrderSummary.propTypes = {
  ingredients: PropTypes.object,
  onOrderCancel: PropTypes.func,
  onOrderContinue: PropTypes.func,
  totalPrice: PropTypes.number
};

export default OrderSummary;
