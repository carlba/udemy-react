import React from 'react';

import styles from './Toolbar.module.css';
import Logo from '../../../components/Logo/Logo';

const Toolbar = props => (
  <header className={styles.Toolbar}>
    <div>MENU</div>
    <Logo></Logo>
    <nav></nav>
  </header>
);

export default Toolbar;
