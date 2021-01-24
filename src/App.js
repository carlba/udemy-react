import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { name: 'Carl', age: 37 },
      { name: 'Johanna', age: 32 },
      { name: 'Tobias', age: 27 }
    ]
  };

  switchNameHandler = newName => {
    console.log('switchNameHandler called');
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

  render() {
    return (
      <div className="App">
        <h1>Hi I'm a React App</h1>
        <p>This is really working!</p>
        <button onClick={() => this.switchNameHandler('Carlos')}>Switch Name</button>
        <Person name={this.state.persons[0].name} age={this.state.persons[0].age} />
        <Person
          name={this.state.persons[1].name}
          age={this.state.persons[1].age}
          click={this.switchNameHandler.bind(this, 'Charles')}
          changed={this.nameChangedHandler}
        >
          My hobbies: Dancing
        </Person>
        <Person name={this.state.persons[2].name} age={this.state.persons[2].age} />
      </div>
    );
  }
}

export default App;
