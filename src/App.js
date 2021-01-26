import React, { Component } from 'react';
import styles from './App.module.css';

import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: 'asdfasdf', name: 'Carl', age: 37 },
      { id: 'wtasdf', name: 'Johanna', age: 32 },
      { id: 'basdss', name: 'Tobias', age: 27 }
    ],
    showPersons: false
  };

  nameChangedHandler = (event, id) => {
    const persons = [...this.state.persons].map(person =>
      person.id !== id ? person : { ...person, name: event.targe.test }
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
    let persons = null;
    let buttonClass = '';

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => (
            <Person
              click={this.deletePersonHandler.bind(this, index)}
              name={person.name}
              age={person.age}
              key={person.id}
              changed={event => this.nameChangedHandler(event, person.id)}
            />
          ))}
        </div>
      );
      buttonClass = styles.red;
    }

    let classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red');
    }

    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      <div className={styles.App}>
        <h1>Hi I'm a React App</h1>
        <p className={classes.join(' ')}>This is really working!</p>
        <button className={buttonClass} onClick={this.togglePersonsHandler}>
          Toggle Persons
        </button>
        {persons}
      </div>
    );
  }
}

export default App;
