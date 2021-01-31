import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Aux from '../../../hoc/Aux';
import withClass from '../../../hoc/withClass';
import styles from './Person.module.css';
import AuthContext from '../../../context/auth-context';

class Person extends Component {
  constructor() {
    super();
    this.inputElementRef = React.createRef();
  }

  static contextType = AuthContext;

  componentDidMount() {
    // this.inputElement.focus();
    this.inputElementRef.current.focus();
  }
  render() {
    console.log('[Person.js] render()');
    return (
      <Aux className={styles.Person}>
        {this.context.authenticated ? <p>Authenticated</p> : <p>Please log in</p>}
        <p key="1" onClick={this.props.click}>
          I'm {this.props.name} and I am {this.props.age} years old
        </p>
        <p key="2">{this.props.children}</p>
        <input
          key="3"
          // ref={inputElement => {
          //   this.inputElement = inputElement;
          // }}
          ref={this.inputElementRef}
          type="text"
          onChange={this.props.changed}
          value={this.props.name}
        />
      </Aux>
    );
  }
}

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func
};

export default withClass(Person, styles.Person);
