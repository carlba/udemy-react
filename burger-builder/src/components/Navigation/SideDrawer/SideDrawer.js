import React from 'react';
import PropTypes from 'prop-types';

import styles from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const SideDrawer = () => (
  <div className={styles.SideDrawer}>
    <div className={styles.Logo}>
      <Logo />
    </div>

    <nav>
      <NavigationItems />
    </nav>
  </div>
);

SideDrawer.propTypes = {};

export default SideDrawer;
