import React from 'react';

import Backdrop from './Backdrop/Backdrop';

import styles from './Modal.module.css';

const Modal = props => (
  <React.Fragment>
    <Backdrop show={props.show} onBackdropClick={props.onModalClose} />
    <div
      className={styles.Modal}
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0'
      }}
    >
      {props.children}
    </div>
  </React.Fragment>
);

export default Modal;
