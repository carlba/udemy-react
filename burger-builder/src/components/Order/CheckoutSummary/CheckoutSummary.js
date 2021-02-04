import React from 'react';
import PropTypes from 'prop-types';
import styles from './CheckoutSummary.module.css';
import Burger from '../../Burger/Burger';
import Button from '../../ui/Button/Button';

const CheckoutSummary = props => (
  <div className={styles.CheckoutSummary}>
    <h1>We hope it tastes well!</h1>
    <div style={{ width: '100%', margin: 'auto' }}>
      <Burger ingredients={props.ingredients} />
    </div>
    <Button buttonType="Danger" clicked>
      Cancel
    </Button>
    <Button buttonType="Success" clicked>
      Continue
    </Button>
  </div>
);

CheckoutSummary.propTypes = {};

CheckoutSummary.defaultProps = {
  ingredients: PropTypes.object
};

export default CheckoutSummary;
