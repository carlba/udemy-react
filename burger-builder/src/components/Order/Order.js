import React from 'react';
import PropTypes from 'prop-types';
import styles from './Order.module.css';

const Order = props => {
  const ingredients = Object.entries(props.ingredients).reduce((acc, [key, value]) => {
    return [
      ...acc,
      <span
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '0 8px',
          padding: '5px',
          border: '1px solid #ccc'
        }}
        key={key}
      >{`${key} ${value}`}</span>
    ];
  }, []);
  return (
    <div className={styles.Order}>
      <p>Ingredients: {ingredients} </p>
      <p>
        Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

Order.propTypes = {
  price: PropTypes.number,
  ingredients: PropTypes.exact({
    salad: PropTypes.number.isRequired,
    bacon: PropTypes.number.isRequired,
    cheese: PropTypes.number.isRequired,
    meat: PropTypes.number.isRequired
  })
};

Order.defaultProps = {};

export default Order;
