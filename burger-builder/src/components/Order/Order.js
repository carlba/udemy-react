import React from 'react';
import PropTypes from 'prop-types';
import styles from './Order.module.css';

const Order = props => (
  <div className={styles.Order}>
    <p>Ingredients: Salad(1) </p>
    <p>
      Price: <strong>USD 5.45</strong>{' '}
    </p>
  </div>
);

Order.propTypes = {};

Order.defaultProps = {};

export default Order;
