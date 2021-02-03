import React from 'react';
import PropTypes from 'prop-types';
import styles from './DrawerToggle.module.css';

const DrawerToggle = props => (
  <div className={styles.DrawerToggle} onClick={props.onClick}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

DrawerToggle.propTypes = { onClick: PropTypes.func };

export default DrawerToggle;
