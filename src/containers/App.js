import React, { Component } from 'react';
import styles from './App.module.css';

import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

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
    showCockPit: true
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
    this.setState({ persons });
  };

  deletePersonHandler = personIndex => {
    this.setState({ persons: this.state.persons.filter((_, index) => index !== personIndex) });
  };

  togglePersonsHandler = () => {
    this.setState({ showPersons: !this.state.showPersons });
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
          ></Persons>
        </div>
      );
    }

    return (
      <div className={styles.App}>
        <button onClick={() => this.setState({ showCockPit: false })}>Remove Cockpit</button>
        {this.state.showCockPit ? (
          <Cockpit
            title={this.props.appTitle}
            personsLength={this.state.persons.length}
            showPersons={this.state.showPersons}
            clicked={this.togglePersonsHandler}
          ></Cockpit>
        ) : null}
        {persons}
      </div>
    );
  }
}

export default App;
