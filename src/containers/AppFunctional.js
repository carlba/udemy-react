import React, { useState } from 'react';
import './App.css';
import Person from './Person/Person';

const App = props => {
  const [personsState, setPersonsState] = useState({
    persons: [
      { name: 'Carl', age: 37 },
      { name: 'Johanna', age: 32 },
      { name: 'Tobias', age: 27 }
    ]
  });

  const switchNameHandler = () => {
    console.log('switchNameHandler called');
    // React will not detect: state.persons[0].name = 'Carlos';
    setPersonsState({
      persons: [
        { name: 'Carlos', age: 37 },
        { name: 'Johanna', age: 32 },
        { name: 'Tobias', age: 28 }
      ]
    });
  };

  return (
    <div className="App">
      <h1>Hi I'm a React App</h1>
      <p>This is really working!</p>
      <button onClick={switchNameHandler}>Switch Name</button>
      <Person name={personsState.persons[0].name} age={personsState.persons[0].age} />
      <Person name={personsState.persons[1].name} age={personsState.persons[1].age}>
        My hobbies: Dancing
      </Person>
      <Person name={personsState.persons[2].name} age={personsState.persons[2].age} />
    </div>
  );
};

export default App;
