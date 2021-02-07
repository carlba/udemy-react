import axios from 'axios';
import { getTimeDifferenceInSeconds } from '../../utils/utils';
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

export const checkAuthTimeout = expirationTimeS => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTimeS * 1000);
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
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
      const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
      localStorage.setItem('token', response.data.idToken);
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('userId', response.data.localId);
      dispatch(authSuccess(response.data.idToken, response.data.localId));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    } catch (error) {
      console.error('Error on auth post', error.response.data.error);
      dispatch(authFail(error.response.data.error));
    }
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout(getTimeDifferenceInSeconds(expirationDate, new Date())));
      }
    }
  };
};
