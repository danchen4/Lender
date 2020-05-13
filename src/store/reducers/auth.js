import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '',
  userData: { email: '', passwordHash: '' },
};

const authStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: true,
  };
};

const authFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const authSuccess = (state, action) => {
  return {
    ...state,
    token: action.token,
    userId: action.userId,
    error: null,
    loading: false,
  };
};

const authLogout = (state, action) => {
  return {
    ...state,
    token: null,
    userId: null,
    loading: false,
  };
};

const setAuthRedirect = (state, action) => {
  return {
    ...state,
    authRedirectPath: action.path,
  };
};

const fetchUserSuccess = (state, action) => {
  const userDataCopy = {
    ...state.userData,
    email: action.email,
    passwordHash: action.passwordHash,
  };

  return {
    ...state,
    error: null,
    loading: false,
    userData: userDataCopy,
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.SET_AUTH_REDIRECT:
      return setAuthRedirect(state, action);
    default:
      return state;
  }
};
