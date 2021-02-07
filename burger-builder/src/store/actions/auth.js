import axios from 'axios';
import * as actionsTypes from './actionsTypes';

export const authStart = () => {
  return { type: actionsTypes.AUTH_START };
};

export const authSuccess = (token, userId) => {
  return { type: actionsTypes.AUTH_SUCCESS, token, userId };
};

export const authFail = error => {
  return { type: actionsTypes.AUTH_FAIL, error };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const logout = () => {
  return { type: actionsTypes.AUTH_LOGOUT };
};

export const auth = (email, password, isSignup) => {
  return async dispatch => {
    dispatch(authStart());
    try {
      const apiKey = 'AIzaSyCccVmqQ02pfTgSwGsbaq3VwBi1v8MkIXk';
      const url = isSignup
        ? `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`
        : `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

      const response = await axios.post(url, { email, password, returnSecureToken: true });
      console.log('Auth data', response.data);
      dispatch(authSuccess(response.data.idToken, response.data.localId));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    } catch (error) {
      console.error('Error on auth post', error.response.data.error);
      dispatch(authFail(error.response.data.error));
    }
  };
};
