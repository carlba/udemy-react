import React, { Component } from 'react';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';

import styles from './Orders.module.css';
import Order from '../../components/Order/Order';
import * as actions from '../../store/actions';
import { Spinner } from '../../components/ui/Spinner/Spinner';

class Orders extends Component {
  async componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  render() {
    let orders = <Spinner />;

    if (!this.props.loading) {
      orders = this.props.orders.map(order => {
        return <Order key={order.id} price={order.price} ingredients={order.ingredients}></Order>;
      });
    }
    return <div className={styles.Orders}>{orders}</div>;
  }
}

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId
});

const mapDispatchToProps = dispatch => {
  return { onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
