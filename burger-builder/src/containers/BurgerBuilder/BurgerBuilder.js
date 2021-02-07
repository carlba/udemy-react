import React, { Component } from 'react';
import { connect } from 'react-redux';

import axiosOrders from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/ui/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import { Spinner } from '../..//components/ui/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actions from '../../store/actions';

class BurgerBuilder extends Component {
  state = {
    isOrdering: false,
    loading: false
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  isReadyToOrder(ingredients) {
    return !Object.values(ingredients).every(amount => amount === 0);
  }

  handleOrder = () => {
    if (this.props.isAuthenticated) {
      this.setState({ isOrdering: true });
    } else {
      this.props.history.push({
        pathname: 'auth',
        search: new URLSearchParams({ redirectUrl: '/checkout' }).toString()
      });
    }
  };

  handleOrderCancel = () => {
    this.setState({ isOrdering: false });
  };

  handleOrderContinue = async () => {
    this.props.history.push({ pathname: '/checkout' });
  };

  render() {
    let orderSummary = null;
    let burger = <Spinner />;
    if (this.props.ings) {
      const disabledInfo = Object.entries(this.props.ings).reduce((acc, [key, value]) => {
        return { ...acc, [key]: value <= 0 };
      }, {});
      burger = (
        <React.Fragment>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            onIngredientAdd={this.props.onAddIngredient}
            onIngredientRemove={this.props.onRemoveIngredient}
            disabledInfo={disabledInfo}
            isReadyToOrder={this.isReadyToOrder(this.props.ings)}
            isOrdering={this.state.isOrdering}
            isAuthenticated={this.props.isAuthenticated}
            onOrdered={this.handleOrder}
            price={this.props.totalPrice}
          ></BuildControls>
        </React.Fragment>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          totalPrice={this.props.totalPrice}
          onOrderCancel={this.handleOrderCancel}
          onOrderContinue={this.handleOrderContinue}
        ></OrderSummary>
      );
    }
    return (
      <React.Fragment>
        <Modal
          show={this.state.isOrdering}
          disabled={this.state.isOrdering}
          onModalClose={this.handleOrderCancel}
        >
          {orderSummary}
        </Modal>
        {burger}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ings: state.burgerBuilder.ingredients,
  totalPrice: state.burgerBuilder.totalPrice,
  error: state.burgerBuilder.error,
  isAuthenticated: !!state.auth.token
});

const mapDispatchToProps = dispatch => ({
  onAddIngredient: name => dispatch(actions.addIngredient(name)),
  onRemoveIngredient: name => dispatch(actions.removeIngredient(name)),
  onInitIngredients: () => dispatch(actions.initIngredients())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axiosOrders));
