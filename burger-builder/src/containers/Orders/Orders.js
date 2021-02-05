import React, { Component } from 'react';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import styles from './Orders.module.css';

import Order from '../../components/Order/Order';

class Orders extends Component {
  state = { orders: [], loading: true };

  async componentDidMount() {
    try {
      const response = await axios.get(
        'https://udemy-react-burger-build-default-rtdb.firebaseio.com/orders.json'
      );
      const orders = Object.entries(response.data).reduce((acc, [key, value]) => {
        return [...acc, { ...value, id: key }];
      }, []);
      this.setState({ loading: false, orders });
    } catch (err) {
      console.log('Error on getting orders');
      this.setState({ loading: false });
    }
  }

  render() {
    let orders = null;
    if (this.state.orders) {
      orders = this.state.orders.map(order => {
        return <Order key={order.id} price={order.price} ingredients={order.ingredients}></Order>;
      });
    }
    return <div className={styles.Orders}>{orders}</div>;
  }
}

export default withErrorHandler(Orders, axios);
