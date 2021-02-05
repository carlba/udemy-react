import React from 'react';
import PropTypes from 'prop-types';
import styles from './Input.module.css';

const Input = props => {
  let inputElement = null;

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          className={styles.InputElement}
          {...props.elementConfig}
          value={props.value}
          onChange={props.onInputChange}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={styles.InputElement}
          {...props.elementConfig}
          value={props.value}
          onChange={props.onInputChange}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={styles.InputElement}
          {...props.elementConfig}
          value={props.value}
          onChange={props.onInputChange}
        >
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input className={styles.inputElement} value={props.value} onChange={props.onInputChange} />
      );
  }

  return (
    <div className={styles.Input}>
      <label className={styles.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

Input.propTypes = {
  elementType: PropTypes.string,
  elementConfig: PropTypes.exact({ type: PropTypes.string, placeholder: PropTypes.string }),
  value: PropTypes.string,
  onInputChange: PropTypes.func
};

Input.defaultProps = {};

export default Input;
