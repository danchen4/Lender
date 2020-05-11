import * as actionTypes from '../actions/actionTypes';
import { cloneDeep } from 'lodash';

const initialState = {
  applications: [],
  error: null,
  loading: false,
};

const submitStart = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const submitFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const submitSuccess = (state, action) => {
  const newApplication = { ...action.applicationData, id: action.appId };

  return {
    ...state,
    applications: state.applications.concat(newApplication),
    loading: false,
    error: null,
  };
};

const fetchStart = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const fetchFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const fetchSuccess = (state, action) => {
  return {
    ...state,
    applications: action.applicationsArray,
    loading: false,
    error: null,
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUBMIT_START:
      return submitStart(state, action);
    case actionTypes.SUBMIT_FAIL:
      return submitFail(state, action);
    case actionTypes.SUBMIT_SUCCESS:
      return submitSuccess(state, action);
    case actionTypes.FETCH_START:
      return fetchStart(state, action);
    case actionTypes.FETCH_FAIL:
      return fetchFail(state, action);
    case actionTypes.FETCH_SUCCESS:
      return fetchSuccess(state, action);
    default:
      return state;
  }
};
