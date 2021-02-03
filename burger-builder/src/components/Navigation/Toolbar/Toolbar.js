import React from 'react';
import PropTypes from 'prop-types';

import styles from './Toolbar.module.css';
import Logo from '../../../components/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = props => (
  <header className={styles.Toolbar}>
    <DrawerToggle onClick={props.onMenuButtonClick}></DrawerToggle>
    <div className={styles.Logo}>
      <Logo></Logo>
    </div>
    <nav className={styles.DesktopOnly}>
      <NavigationItems></NavigationItems>
    </nav>
  </header>
);

Toolbar.propTypes = {
  onMenuButtonClick: PropTypes.func
};

export default Toolbar;
