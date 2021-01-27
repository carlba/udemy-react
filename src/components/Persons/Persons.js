import React from 'react';

import Person from './Person/Person';

const persons = props => {
  console.log('[Persons.js] render()');
  return props.persons.map((person, index) => (
    <Person
      click={() => props.clicked(index)}
      name={person.name}
      age={person.age}
      changed={event => props.changed(event, person.id)}
      key={person.id}
    />
  ));
};

export default persons;
