import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './ContactData.module.css';
import Button from '../../components/ui/Button/Button';
import Spinner from '../../components/ui/Spinner/Spinner';
import axiosOrders from '../../axios-orders';
import Input from '../../components/ui/Input/Input';

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
        value: ''
      }
    },
    formIsValid: true,
    loading: false
  };

  handleOrder = async event => {
    event.preventDefault();
    this.setState({ loading: true });
    const orderFormData = Object.entries(this.state.orderForm).reduce((acc, [id, { value }]) => {
      return {
        ...acc,
        [id]: value
      };
    }, {});

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: orderFormData
    };

    try {
      await axiosOrders.post('/orders.json', order);
      this.setState({ loading: false });
      this.props.history.push('/');
    } catch (err) {
      console.log('Error while posting order', err);
      this.setState({ loading: false });
    }
  };

  checkValidity(value, rules) {
    let isValid = true;

    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }

  handleInputChange = (event, inputId) => {
    this.setState((prevState, props) => {
      const orderForm = {
        ...prevState.orderForm,
        [inputId]: {
          ...prevState.orderForm[inputId],
          value: event.target.value,
          valid: this.checkValidity(event.target.value, prevState.orderForm[inputId].validation),
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
    if (this.state.loading) {
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

ContactData.propTypes = { onClick: PropTypes.func, totalPrice: PropTypes.number };

export default withRouter(ContactData);
