import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './ContactData.module.css';
import Button from '../../components/ui/Button/Button';
import Spinner from '../../components/ui/Spinner/Spinner';
import axiosOrders from '../../axios-orders';

class ContactData extends Component {
  state = { name: '', email: '', address: { street: '', postalCode: '' }, loading: false };

  handleOrder = async event => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: 'Carl Backstrom',
        address: { street: 'Test Street', country: 'Sweden', zipCode: '11862' },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
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
    let form = (
      <form>
        <input className={styles.Input} type="text" name="name" placeholder="Your name" />
        <input className={styles.Input} type="email" name="email" placeholder="Your email" />
        <input className={styles.Input} type="text" name="street" placeholder="Your street" />
        <input className={styles.Input} type="text" name="postal" placeholder="Your postal code" />
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
