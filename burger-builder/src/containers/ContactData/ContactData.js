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
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Street'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country'
        },
        value: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Zip Code'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        value: ''
      }
    },
    loading: false
  };

  handleOrder = async event => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice
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

  render() {
    const formElementsArray = Object.entries(this.state.orderForm).reduce((acc, [id, config]) => {
      return [...acc, { ...config, id }];
    }, []);

    let form = (
      <form>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.elementType}
            elementConfig={formElement.elementConfig}
            value={formElement.value}
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
        <Button buttonType="Success" onClick={this.handleOrder}>
          ORDER
        </Button>
      </div>
    );
  }
}

ContactData.propTypes = { onClick: PropTypes.func, totalPrice: PropTypes.number };

export default withRouter(ContactData);
