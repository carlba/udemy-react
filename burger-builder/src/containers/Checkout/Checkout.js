import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../ContactData/ContactData';

class Checkout extends Component {
  handleCheckoutContinue = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ings) {
      summary = (
        <div>
          <CheckoutSummary
            onCancel={this.handleCheckoutCancel}
            onContinue={this.handleCheckoutContinue}
            ingredients={this.props.ings}
          />
          <Route path={`${this.props.match.path}/contact-data`} component={ContactData} />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = state => ({
  ings: state.ingredients
});

export default connect(mapStateToProps)(Checkout);
