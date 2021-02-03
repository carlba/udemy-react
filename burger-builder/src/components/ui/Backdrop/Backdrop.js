import React from 'react';
import PropTypes from 'prop-types';

import styles from './Backdrop.module.css';

const Backdrop = props =>
  props.show ? <div className={styles.Backdrop} onClick={props.onBackdropClick}></div> : null;

Backdrop.propTypes = {
  onBackdropClick: PropTypes.func,
  show: PropTypes.bool
};

export default Backdrop;
