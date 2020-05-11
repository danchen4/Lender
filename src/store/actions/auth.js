import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId,
  };
};

export const logoutAccount = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logoutAccount());
    }, expirationTime * 1000);
  };
};

export const loginAccount = (formikValues, formikActions, isSignUp) => {
  return (dispatch) => {
    const authData = {
      email: formikValues.email,
      password: formikValues.password,
      returnSecureToken: true,
    };
    dispatch(authStart);
    let url;
    if (isSignUp) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBsThRZYZdkCxZOt2QXRDW6ARulOx6VN74';
    } else {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBsThRZYZdkCxZOt2QXRDW6ARulOx6VN74';
    }
    formikActions.setSubmitting(true);
    axios
      .post(url, authData)
      .then((response) => {
        console.log('login/signup', response.data);
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((err) => {
        console.log(err.response);
        // if (err.response.data.error.message === 'EMAIL_EXISTS') {
        //   formikActions.setErrors({ email: 'Email already exists' });
        //   dispatch(authFail(err.response.data.error));
        // }
        // if (err.response.data.error.message === 'EMAIL_NOT_FOUND') {
        //   formikActions.setErrors({ email: 'Email not found' });
        //   dispatch(authFail(err.response.data.error));
        // }
        // if (err.response.data.error.message === 'INVALID_PASSWORD') {
        //   formikActions.setErrors({ password: 'Invalid password' });
        //   dispatch(authFail(err.response.data.error));
        // }
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT,
    path: path,
  };
};

export const checkLoginState = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');

    if (!token) {
      dispatch(logoutAccount());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate > new Date()) {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      } else {
        dispatch(logoutAccount());
      }
    }
  };
};

export const fetchUserSuccess = (email, passwordHash) => {
  return {
    type: actionTypes.RETRIEVE_ACCOUNT_SUCCESS,
    email: email,
    passwordHash: passwordHash,
  };
};

export const fetchUser = (token) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBsThRZYZdkCxZOt2QXRDW6ARulOx6VN74',
        { idToken: token }
      )
      .then((res) => {
        console.log(res);
      });
  };
};
