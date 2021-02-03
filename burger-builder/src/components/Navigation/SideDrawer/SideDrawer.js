import React from 'react';
import PropTypes, { bool } from 'prop-types';

import styles from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../ui/Backdrop/Backdrop';

const SideDrawer = props => {
  const attachedClasses = [styles.SideDrawer, props.show ? styles.Open : styles.Close];
  return (
    <React.Fragment>
      <Backdrop show={props.show} onBackdropClick={props.onClose} />
      <div className={attachedClasses.join(' ')}>
        <div className={styles.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </React.Fragment>
  );
};

SideDrawer.propTypes = {
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  show: bool
};

export default SideDrawer;
