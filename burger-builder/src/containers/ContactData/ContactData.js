import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './ContactData.module.css';
import Button from '../../components/ui/Button/Button';
import { Spinner } from '../../components/ui/Spinner/Spinner';
import axiosOrders from '../../axios-orders';
import Input from '../../components/ui/Input/Input';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { checkValidity } from '../../shared/utils';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: { required: true },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Street'
        },
        value: '',
        validation: { required: true },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country'
        },
        value: '',
        validation: { required: true },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Zip Code'
        },
        value: '',
        validation: { required: true, minLength: 5, maxLength: 5 },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: '',
        validation: { required: true },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        validation: {},
        value: 'fastest'
      }
    },
    formIsValid: true
  };

  handleOrder = async event => {
    event.preventDefault();
    const orderFormData = Object.entries(this.state.orderForm).reduce((acc, [id, { value }]) => {
      return {
        ...acc,
        [id]: value
      };
    }, {});

    const order = {
      ingredients: this.props.ings,
      price: this.props.totalPrice,
      orderData: orderFormData,
      userId: this.props.userId
    };

    this.props.onOrderBurger(order, this.props.token);
  };

  handleInputChange = (event, inputId) => {
    this.setState((prevState, props) => {
      const orderForm = {
        ...prevState.orderForm,
        [inputId]: {
          ...prevState.orderForm[inputId],
          value: event.target.value,
          valid: checkValidity(event.target.value, prevState.orderForm[inputId].validation),
          touched: true
        }
      };
      const formIsValid = Object.values(orderForm).every(value =>
        value.validation ? value.valid : true
      );
      return { orderForm, formIsValid };
    });
  };

  render() {
    const formElementsArray = Object.entries(this.state.orderForm).reduce((acc, [id, config]) => {
      return [...acc, { ...config, id }];
    }, []);

    let form = (
      <form onSubmit={this.handleOrder}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.elementType}
            elementConfig={formElement.elementConfig}
            value={formElement.value}
            valid={formElement.valid}
            shouldValidate={!!formElement.validation}
            touched={formElement.touched}
            onInputChange={event => this.handleInputChange(event, formElement.id)}
          ></Input>
        ))}
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={styles.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
        <Button buttonType="Success" disabled={!this.state.formIsValid} onClick={this.handleOrder}>
          ORDER
        </Button>
      </div>
    );
  }
}

ContactData.propTypes = {
  onClick: PropTypes.func,
  totalPrice: PropTypes.number,
  token: PropTypes.string,
  userId: PropTypes.string
};

const mapStateToProps = state => ({
  ings: state.burgerBuilder.ingredients,
  totalPrice: state.burgerBuilder.totalPrice,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId
});

const mapDispatchToProps = dispatch => {
  return { onOrderBurger: (data, token) => dispatch(actions.orderBurger(data, token)) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withErrorHandler(ContactData, axiosOrders)));
