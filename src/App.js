import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { name: 'Carl', age: 37 },
      { name: 'Johanna', age: 32 },
      { name: 'Tobias', age: 27 }
    ],
    showPersons: false
  };

  switchNameHandler = newName => {
    // React will not detect: this.state.persons[0].name = 'Carlos';
    this.setState({
      persons: [
        { name: newName, age: 37 },
        { name: 'Johanna', age: 32 },
        { name: 'Tobias', age: 28 }
      ]
    });
  };

  nameChangedHandler = event => {
    this.setState({
      persons: [
        { name: 'Carl', age: 37 },
        { name: event.target.value, age: 32 },
        { name: 'Tobias', age: 27 }
      ]
    });
  };

  togglePersonsHandler = () => {
    this.setState({ showPersons: !this.state.showPersons });
  };

  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map(person => (
            <Person name={person.name} age={person.age} />
          ))}
        </div>
      );
    }

    return (
      <div className="App">
        <h1>Hi I'm a React App</h1>
        <p>This is really working!</p>
        <button style={style} onClick={this.togglePersonsHandler}>
          Toggle Persons
        </button>
        {persons}
      </div>
    );
  }
}

export default App;
