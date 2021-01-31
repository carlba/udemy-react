import React, { Component, Fragment } from 'react';
import styles from './App.module.css';

import withClass from '../hoc/withClass';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import AuthContext from '../context/auth-context';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
  }
  state = {
    persons: [
      { id: 'asdfasdf', name: 'Carl', age: 37 },
      { id: 'wtasdf', name: 'Johanna', age: 32 },
      { id: 'basdss', name: 'Tobias', age: 27 }
    ],
    showPersons: false,
    showCockPit: true,
    changeCounter: 0,
    authenticated: false
  };

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps()', props);
    return state;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate()');
  }

  shouldComponentUpdate() {
    console.log('[App.js] shouldComponentUpdate()');
    return true;
  }

  /**
   * Called before component is unmounted/destroyed
   */
  componentDidUnMount() {
    console.log('[App.js] componentDidMount()');
  }

  nameChangedHandler = (event, id) => {
    const persons = [...this.state.persons].map(person =>
      person.id !== id ? person : { ...person, name: event.target.value }
    );
    this.setState((prevState, props) => ({
      persons,
      changeCounter: prevState.changeCounter + 1
    }));
  };

  deletePersonHandler = personIndex => {
    this.setState({ persons: this.state.persons.filter((_, index) => index !== personIndex) });
  };

  togglePersonsHandler = () => {
    this.setState({ showPersons: !this.state.showPersons });
  };

  loginHandler = () => {
    this.setState({ authenticated: true });
  };

  render() {
    console.log('[App.js] render()');
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          <Persons
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler}
            isAuthenticated={this.state.authenticated}
          ></Persons>
        </div>
      );
    }

    return (
      <Fragment>
        <button onClick={() => this.setState({ showCockPit: false })}>Remove Cockpit</button>
        <AuthContext.Provider
          value={{ authenticated: this.state.authenticated, login: this.loginHandler }}
        >
          {this.state.showCockPit ? (
            <Cockpit
              title={this.props.appTitle}
              personsLength={this.state.persons.length}
              showPersons={this.state.showPersons}
              clicked={this.togglePersonsHandler}
            ></Cockpit>
          ) : null}
          {persons}
        </AuthContext.Provider>
      </Fragment>
    );
  }
}

export default withClass(App, styles.App);
