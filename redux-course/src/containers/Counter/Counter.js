import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actions';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
  state = {
    counter: 0
  };

  counterChangedHandler = (action, value) => {
    // eslint-disable-next-line default-case
    switch (action) {
      case 'inc':
        this.setState(prevState => {
          return { counter: prevState.counter + 1 };
        });
        break;
      case 'dec':
        this.setState(prevState => {
          return { counter: prevState.counter - 1 };
        });
        break;
      case 'add':
        this.setState(prevState => {
          return { counter: prevState.counter + value };
        });
        break;
      case 'sub':
        this.setState(prevState => {
          return { counter: prevState.counter - value };
        });
        break;
    }
  };

  render() {
    return (
      <div>
        <CounterOutput value={this.props.ctr} />
        <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
        <CounterControl label="Decrement" clicked={this.props.onDecrementCounter} />
        <CounterControl label="Add 5" clicked={this.props.onAddCounter} />
        <CounterControl label="Subtract 5" clicked={this.props.onSubtractCounter} />
        <hr />
        <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store Result</button>
        <ul>
          {this.props.storedResults.map(result => (
            <li
              style={{ cursor: 'pointer' }}
              key={result.id}
              onClick={() => this.props.onDeleteResult(result.id)}
            >
              {result.value}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

/**
 * Maps things in the redux state to a prop in the component.
 * @param {object} state
 */
const mapStateToProps = state => ({
  ctr: state.counter.counter,
  storedResults: state.result.results
});

/**
 * This functions maps props to actions in the state. They then need to be handled by a
 * reducer. The actions `onIncrementCounter` will be available on the class as
 * `this.onIncrementCounter()`.
 *
 */
const mapDispatchToProps = dispatch => ({
  onIncrementCounter: () => {
    return dispatch(actions.increment());
  },
  onDecrementCounter: () => {
    return dispatch(actions.decrement());
  },
  onAddCounter: () => {
    return dispatch(actions.add(5));
  },
  onSubtractCounter: () => {
    return dispatch(actions.subtract(5));
  },
  onStoreResult: result => dispatch(actions.storeResult(result)),
  onDeleteResult: id => dispatch(actions.deleteResult(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
