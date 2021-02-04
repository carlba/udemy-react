import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Orders.module.css';

import Order from '../../components/Order/Order';

class Orders extends Component {
  render() {
    return (
      <div className={styles.Orders}>
        <Order />
        <Order />
      </div>
    );
  }
}

Orders.propTypes = {};

Orders.defaultProps = {};

export default Orders;
