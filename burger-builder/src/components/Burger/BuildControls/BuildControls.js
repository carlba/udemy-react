import React from 'react';

import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];

const BuildControls = props => (
  <div className={styles.BuildControls}>
    <p>
      Current Price: <strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map(control => (
      <BuildControl
        key={control.label}
        type={control.type}
        label={control.label}
        onIngredientAdd={() => props.onIngredientAdd(control.type)}
        onIngredientRemove={() => props.onIngredientRemove(control.type)}
        disabled={props.disabledInfo[control.type]}
      />
    ))}
    <button
      className={styles.OrderButton}
      disabled={!props.isReadyToOrder}
      onClick={props.onOrdered}
    >
      ORDER NOW
    </button>
  </div>
);

export default BuildControls;
