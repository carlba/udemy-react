import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './ContactData.module.css';
import Button from '../../components/ui/Button/Button';

class ContactData extends Component {
  state = { name: '', email: '', address: { street: '', postalCode: '' } };
  render() {
    return (
      <div className={styles.ContactData}>
        <h4>Enter your contact data</h4>
        <form>
          <input className={styles.Input} type="text" name="name" placeholder="Your name" />
          <input className={styles.Input} type="email" name="email" placeholder="Your email" />
          <input className={styles.Input} type="text" name="street" placeholder="Your street" />
          <input
            className={styles.Input}
            type="text"
            name="postal"
            placeholder="Your postal code"
          />
        </form>
        <Button buttonType="Success">ORDER</Button>
      </div>
    );
  }
}

ContactData.propTypes = {};

ContactData.defaultProps = {};

export default ContactData;
