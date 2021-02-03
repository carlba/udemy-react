import React from 'react';

import styles from './Toolbar.module.css';
import Logo from '../../../components/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const Toolbar = props => (
  <header className={styles.Toolbar}>
    <div>MENU</div>
    <div className={styles.Logo}>
      <Logo></Logo>
    </div>
    <nav className={styles.DesktopOnly}>
      <NavigationItems></NavigationItems>
    </nav>
  </header>
);

export default Toolbar;
