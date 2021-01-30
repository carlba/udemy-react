import React, { Component, PureComponent } from 'react';

import Person from './Person/Person';

class Persons extends PureComponent {
  // static getDerivedStateFromProps(props, state) {
  //   console.log('[Person.js] getDerivedStateFromProps()');
  //   return state;
  // }

  /**
   * Will determine if the component will run the update cycle or not. Use PureComponent
   * most when you want to compare all props on change. This is for when you need
   * more fine grain control.
   * @param {*} nextProps
   */
  // shouldComponentUpdate(nextProps) {
  //   console.log('[Person.js] shouldComponentUpdate()');
  //   // return nextProps.persons !== this.props.persons;
  //   return true;
  // }

  /**
   * This will allow you to create a snapshot that can then be retrieved in the
   * componentDidUpdate lifecycle hook.
   * @param {*} prevProps
   * @param {*} prevSate
   */
  getSnapshotBeforeUpdate(prevProps, prevSate) {
    console.log('[Person.js] shouldComponentUpdate()');
    return { message: 'Snapshot!' };
  }

  /**
   * Triggered after the component updated also has the snapshot set in
   * getSnapshotBeforeUpdate
   */
  componentDidUpdate(prevProps, prevSate, snapshot) {
    console.log('[Person.js] componentDidUpdate()', snapshot);
  }

  /**
   * Triggered before component is destroyed/unmounted
   */
  componentWillUnmount() {
    console.log('[Person.js] componentWillUnmount()');
  }
  render() {
    console.log('[Persons.js] render()');
    return this.props.persons.map((person, index) => (
      <Person
        click={() => this.props.clicked(index)}
        name={person.name}
        age={person.age}
        changed={event => this.props.changed(event, person.id)}
        key={person.id}
        isAuthenticated={this.props.isAuthenticated}
      />
    ));
  }
}

export default Persons;
