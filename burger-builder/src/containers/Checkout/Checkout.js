import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../ContactData/ContactData';
import * as actions from '../../store/actions';

class Checkout extends Component {
  handleCheckoutContinue = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  componentWillMount() {
    this.props.onInitOrderBurger();
  }

  render() {
    let summary = <Redirect to="/" />;

    if (this.props.ings) {
      const orderedRedirect = this.props.isOrdered ? <Redirect to="/" /> : null;
      summary = (
        <div>
          {orderedRedirect}
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
  ings: state.burgerBuilder.ingredients,
  isOrdered: state.order.isOrdered
});

const mapDispatchToProps = dispatch => {
  return { onInitOrderBurger: () => dispatch(actions.orderBurgerInit()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
