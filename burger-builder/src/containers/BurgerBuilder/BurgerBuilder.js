import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/ui/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../..//components/ui/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axiosOrders from '../../axios-orders';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    isReadyToOrder: false,
    isOrdering: false,
    loading: false
  };

  async componentDidMount() {
    try {
      const response = await axiosOrders.get(
        'https://udemy-react-burger-build-default-rtdb.firebaseio.com/ingredients.json'
      );
      this.setState({ ingredients: response.data });
    } catch (err) {
      console.log('Error on getting ingredients');
    }
  }

  updateIsReadyToOrder(ingredients) {
    this.setState({
      isReadyToOrder: !Object.values(ingredients).every(amount => amount === 0)
    });
  }

  handleAddIngredient = type => {
    const updatedCount = this.state.ingredients[type] + 1;
    const updatedState = {
      ingredients: { ...this.state.ingredients, [type]: updatedCount },
      totalPrice: this.state.totalPrice + INGREDIENT_PRICES[type]
    };
    this.setState(updatedState);
    this.updateIsReadyToOrder(updatedState.ingredients);
  };

  handleRemoveIngredient = type => {
    if (this.state.ingredients[type] <= 0) {
      return;
    }
    const updatedCount = this.state.ingredients[type] - 1;
    const updatedState = {
      ingredients: { ...this.state.ingredients, [type]: updatedCount },
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
    // this.setState({ loading: true });
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: 'Carl Backstrom',
    //     address: { street: 'Test Street', country: 'Sweden', zipCode: '11862' },
    //     email: 'test@test.com'
    //   },
    //   deliveryMethod: 'fastest'
    // };
    // try {
    //   const response = await axiosOrders.post('/orders.json', order);
    //   console.log('Response from handle order', response);
    // } catch (err) {
    //   console.log('Error while posting order', err);
    // } finally {
    //   this.setState({ loading: false, isOrdering: false });
    // }
    const queryString = new URLSearchParams(this.state.ingredients).toString();
    this.props.history.push({ pathname: '/checkout', search: queryString });
  };

  render() {
    let orderSummary = null;
    let burger = <Spinner />;
    if (this.state.ingredients) {
      const disabledInfo = Object.entries(this.state.ingredients).reduce((acc, [key, value]) => {
        return { ...acc, [key]: value <= 0 };
      }, {});
      burger = (
        <React.Fragment>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            onIngredientAdd={this.handleAddIngredient}
            onIngredientRemove={this.handleRemoveIngredient}
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
          ingredients={this.state.ingredients}
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

export default withErrorHandler(BurgerBuilder, axiosOrders);
