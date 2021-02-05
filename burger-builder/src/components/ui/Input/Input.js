import React from 'react';
import PropTypes from 'prop-types';
import styles from './Input.module.css';

const Input = props => {
  let inputElement = null;
  const inputClasses = [styles.InputElement];

  if (!props.valid && props.shouldValidate) {
    inputClasses.push(styles.Invalid);
  }

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.onInputChange}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.onInputChange}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={inputClasses.join(' ')}
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
  elementConfig: PropTypes.exact({
    type: PropTypes.string,
    placeholder: PropTypes.string,
    options: PropTypes.arrayOf(
      PropTypes.exact({ value: PropTypes.string, displayValue: PropTypes.string })
    )
  }),
  value: PropTypes.string,
  valid: PropTypes.bool,
  shouldValidate: PropTypes.bool,
  onInputChange: PropTypes.func
};

Input.defaultProps = {};

export default Input;
