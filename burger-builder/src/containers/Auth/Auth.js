import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';

import styles from './Auth.module.css';
import Input from '../../components/ui/Input/Input';
import Button from '../../components/ui/Button/Button';
import { convertObjectToArray } from '../../utils/utils';
import * as actions from '../../store/actions';
import { Spinner } from '../../components/ui/Spinner/Spinner';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address'
        },
        value: '',
        validation: { required: true, isEmail: true },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Passwords'
        },
        value: '',
        validation: { required: true, minLength: 6 },
        valid: false,
        touched: false
      }
    },
    isSignup: true
  };

  checkValidity(value, rules) {
    let isValid = true;

    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }

  handleInputChange = (event, inputId) => {
    this.setState((prevState, props) => {
      const controls = {
        ...prevState.controls,
        [inputId]: {
          ...prevState.controls[inputId],
          value: event.target.value,
          valid: this.checkValidity(event.target.value, prevState.controls[inputId].validation),
          touched: true
        }
      };
      const formIsValid = Object.values(controls).every(value =>
        value.validation ? value.valid : true
      );
      return { controls, formIsValid };
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state.controls;
    this.props.onAuth(email.value, password.value, this.state.isSignup);
  };

  handleSigning = () => {
    this.setState(prevState => ({ isSignup: !prevState.isSignup }));
  };

  render() {
    const formElementsArray = convertObjectToArray(this.state.controls);

    let form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.elementType}
        elementConfig={formElement.elementConfig}
        value={formElement.value}
        valid={formElement.valid}
        shouldValidate={!!formElement.validation}
        touched={formElement.touched}
        onInputChange={event => this.handleInputChange(event, formElement.id)}
      ></Input>
    ));

    if (this.props.loading) {
      form = <Spinner />;
    }
    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      const queryParams = new URLSearchParams(this.props.location.search);
      authRedirect = <Redirect to={queryParams.get('redirectUrl')} />;
    }

    return (
      <div className={styles.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.handleSubmit}>
          {form}
          <Button buttonType="Success">SUBMIT</Button>
        </form>
        <Button buttonType="Danger" onClick={this.handleSigning}>
          SWITCH TO {this.state.isSignup ? 'SIGNING' : 'SIGNUP'}
        </Button>
      </div>
    );
  }
}

Auth.propTypes = {};

Auth.defaultProps = {};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: !!state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
  };
};

const auth = connect(mapStateToProps, mapDispatchToProps)(withRouter(Auth));

export { auth as Auth };
