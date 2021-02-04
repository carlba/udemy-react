import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './NavigationItem.module.css';

const NavigationItem = props => (
  <li className={styles.NavigationItem}>
    <NavLink to={props.link} activeClassName={styles.active} exact={props.exact}>
      {props.children}
    </NavLink>
  </li>
);

NavigationItem.propTypes = {
  link: PropTypes.string.isRequired,
  active: PropTypes.bool,
  exact: PropTypes.bool
};

export default NavigationItem;
