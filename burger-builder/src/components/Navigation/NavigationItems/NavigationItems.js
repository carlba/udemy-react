import React from 'react';
import PropTypes from 'prop-types';

import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = props => (
  <ul className={styles.NavigationItems}>
    <NavigationItem link="/" exact>
      BurgerBuilder
    </NavigationItem>
    {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
    {!props.isAuthenticated ? (
      <NavigationItem link="/auth">Authenticate</NavigationItem>
    ) : (
      <NavigationItem link="/logout">Logout</NavigationItem>
    )}
  </ul>
);

NavigationItems.propTypes = { isAuthenticated: PropTypes.bool };

NavigationItems.defaultProps = {};

export default NavigationItems;
