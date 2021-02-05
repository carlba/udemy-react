import React from 'react';
import PropTypes from 'prop-types';

import styles from './Button.module.css';

const Button = props => (
  <button
    className={[styles.Button, styles[props.buttonType]].join(' ')}
    disabled={props.disabled}
    onClick={props.onClick}
  >
    {props.children}
  </button>
);

Button.propTypes = {
  buttonType: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};

export default Button;
