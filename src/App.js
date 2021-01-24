import React from 'react';
import './App.css';
import Person from './Person/Person';

function App() {
  return (
    <div class="App">
      <h1>Hi I'm a React App</h1>
      <p>This is really working!</p>
      <Person name="Carl" age="37" />
      <Person name="Johanna" age="32">
        My hobbies: Dancing
      </Person>
      <Person name="Tobias" age="27" />
    </div>
  );
}

export default App;
