import React from 'react';
import PropTypes from 'prop-types';
import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => (
  <ul className={styles.NavigationItems}>
    <NavigationItem link="/" active>
      BurgerBuilder
    </NavigationItem>
    <NavigationItem link="/">Checkout</NavigationItem>
  </ul>
);

NavigationItems.propTypes = {};

NavigationItems.defaultProps = {};

export default NavigationItems;
