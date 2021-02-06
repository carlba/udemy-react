import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/ui/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../..//components/ui/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axiosOrders from '../../axios-orders';
import * as actions from '../../store/actions';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    totalPrice: 4,
    isReadyToOrder: false,
    isOrdering: false,
    loading: false
  };

  async componentDidMount() {
    // try {
    //   const response = await axiosOrders.get(
    //     'https://udemy-react-burger-build-default-rtdb.firebaseio.com/ingredients.json'
    //   );
    //   this.setState({ ingredients: response.data });
    // } catch (err) {
    //   console.log('Error on getting ingredients');
    // }
  }

  updateIsReadyToOrder(ingredients) {
    this.setState({
      isReadyToOrder: !Object.values(ingredients).every(amount => amount === 0)
    });
  }

  handleAddIngredient = type => {
    const updatedCount = this.props.ings[type] + 1;
    const updatedState = {
      ingredients: { ...this.props.ings, [type]: updatedCount },
      totalPrice: this.state.totalPrice + INGREDIENT_PRICES[type]
    };
    this.setState(updatedState);
    this.updateIsReadyToOrder(updatedState.ingredients);
  };

  handleRemoveIngredient = type => {
    if (this.props.ings[type] <= 0) {
      return;
    }
    const updatedCount = this.props.ings[type] - 1;
    const updatedState = {
      ingredients: { ...this.props.ings, [type]: updatedCount },
      totalPrice: this.state.totalPrice - INGREDIENT_PRICES[type]
    };
    this.setState(updatedState);
    this.updateIsReadyToOrder(updatedState.ingredients);
  };

  handleOrder = () => {
    this.setState({ isOrdering: true });
  };

  handleOrderCancel = () => {
    this.setState({ isOrdering: false });
  };

  handleOrderContinue = async () => {
    const queryString = new URLSearchParams({
      ...this.props.ings,
      totalPrice: this.state.totalPrice
    }).toString();
    this.props.history.push({ pathname: '/checkout', search: queryString });
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
            isReadyToOrder={this.state.isReadyToOrder}
            isOrdering={this.state.isOrdering}
            onOrdered={this.handleOrder}
            price={this.state.totalPrice}
          ></BuildControls>
        </React.Fragment>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          totalPrice={this.state.totalPrice}
          onOrderCancel={this.handleOrderCancel}
          onOrderContinue={this.handleOrderContinue}
        ></OrderSummary>
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
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
  ings: state.ingredients
});

const mapDispatchToProps = dispatch => ({
  onAddIngredient: name => dispatch({ type: actions.ADD_INGREDIENT, name }),
  onRemoveIngredient: name => dispatch({ type: actions.REMOVE_INGREDIENT, name })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axiosOrders));
