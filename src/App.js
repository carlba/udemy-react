import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';

import Person from './Person/Person';

const StyledButton = styled.button`
  background-color: green;
  color: white;
  font: inherit;
  border: 1px solid blue;
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: lightgreen;
    color: black;
  }
`;

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
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };
    let persons = null;

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
      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      };
    }

    let classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red');
    }

    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      <div className="App">
        <h1>Hi I'm a React App</h1>
        <p className={classes.join(' ')}>This is really working!</p>
        <StyledButton onClick={this.togglePersonsHandler}>Toggle Persons</StyledButton>
        {persons}
      </div>
    );
  }
}

export default App;
