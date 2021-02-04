import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Checkout.module.css';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1
    }
  };

  handleCheckoutCancel = () => {
    this.props.history.goBack();
  };

  handleCheckoutContinue = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          onCancel={this.handleCheckoutCancel}
          onContinue={this.handleCheckoutContinue}
          ingredients={this.state.ingredients}
        />
      </div>
    );
  }
}

Checkout.propTypes = {};

Checkout.defaultProps = {};

export default Checkout;
