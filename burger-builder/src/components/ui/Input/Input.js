import React from 'react';
import PropTypes from 'prop-types';
import styles from './Input.module.css';

const Input = props => {
  let inputElement = null;
  const { inputType, ...htmlProps } = props;
  switch (inputType) {
    case 'input':
      inputElement = <input className={styles.InputElement} {...htmlProps} />;
      break;
    case 'textarea':
      inputElement = <textarea className={styles.InputElement} {...htmlProps} />;
      break;
    default:
      inputElement = <input className={styles.inputElement} />;
  }

  return (
    <div className={styles.Input}>
      <label className={styles.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

Input.propTypes = { inputType: PropTypes.string };

Input.defaultProps = {};

export default Input;
