import React from 'react';
import PropTypes from 'prop-types';
import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => (
  <ul className={styles.NavigationItems}>
    <NavigationItem link="/" exact>
      BurgerBuilder
    </NavigationItem>
    <NavigationItem link="/orders">Orders</NavigationItem>
  </ul>
);

NavigationItems.propTypes = {};

NavigationItems.defaultProps = {};

export default NavigationItems;
