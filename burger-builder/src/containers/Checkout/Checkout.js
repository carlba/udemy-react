import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import styles from './Checkout.module.css';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1
    },
    totalPrice: 0
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    // console.log(Array.from(query.entries()));

    // const ingredients = Array.from(query.entries()).reduce((acc, [key, value]) => {
    //   return { ...acc, [key]: +value };
    // }, {});

    const params = Object.fromEntries(
      Array.from(query.entries()).map(([key, val]) => [key, +val || 0])
    );
    const { totalPrice, ...ingredients } = params;
    this.setState({ ingredients, totalPrice });
  }

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
        <Route
          path={`${this.props.match.path}/contact-data`}
          render={() => (
            <ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} />
          )}
        />
      </div>
    );
  }
}

Checkout.propTypes = {};

Checkout.defaultProps = {};

export default Checkout;
