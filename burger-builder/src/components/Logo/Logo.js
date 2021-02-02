import React from 'react';
import PropTypes from 'prop-types';

import styles from './Logo.module.css';
import burgerLogo from '../../assets/images/burger-logo.png';

const Logo = () => (
  <div className={styles.Logo}>
    <img src={burgerLogo} alt="MyBurger" />
  </div>
);

Logo.propTypes = {};

export default Logo;
