import React, { useEffect } from 'react';

import styles from './Cockpit.module.css';

const Cockpit = props => {
  useEffect(() => {
    console.log('[Cockpit.js] useEffect()');
    const timer = setTimeout(() => alert('Saved data to cloud!'), 1000);
    return () => {
      clearTimeout(timer);
      console.log('[Cockpit.js] cleanup work in useEffect');
    };
  }, []);

  useEffect(() => {
    console.log('[Cockpit.js] 2nd useEffect');
    return () => {
      console.log('[Cockpit.js] cleanup work in 2nd useEffect');
    };
  });

  let classes = [];
  let buttonClass = '';

  if (props.showPersons) {
    buttonClass = styles.red;
  }

  if (props.persons.length <= 2) {
    classes.push(styles.red);
  }

  if (props.persons.length <= 1) {
    classes.push(styles.bold);
  }

  return (
    <div className={styles.Cockpit}>
      <h1>{props.title}</h1>
      <p className={classes.join(' ')}>This is really working!</p>
      <button className={buttonClass} onClick={props.clicked}>
        Toggle Persons
      </button>
    </div>
  );
};

export default Cockpit;
