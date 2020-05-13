import * as actionTypes from './actionTypes';
import axios from 'axios';

export const submitStart = () => {
  return {
    type: actionTypes.SUBMIT_START,
  };
};

export const submitFail = (error) => {
  return {
    type: actionTypes.SUBMIT_FAIL,
    error: error,
  };
};

export const submitSuccess = (appId, applicationData) => {
  return {
    type: actionTypes.SUBMIT_SUCCESS,
    appId: appId,
    applicationData: applicationData,
  };
};

export const submitApplication = (token, applicationData) => {
  return (dispatch) => {
    dispatch(submitStart);
    axios
      .post(
        'https://loan-application-formik.firebaseio.com/applications.json?auth=' + token,
        applicationData
      )
      .then((res) => {
        console.log('actions - submitApplication(): response', res);
        dispatch(submitSuccess(res.data, applicationData));
      })
      .catch((err) => {
        dispatch(submitFail(err));
      });
  };
};

export const fetchStart = () => {
  return {
    type: actionTypes.FETCH_START,
  };
};

export const fetchFail = (error) => {
  return {
    type: actionTypes.FETCH_FAIL,
    error: error,
  };
};

export const fetchSuccess = (applicationData) => {
  return {
    type: actionTypes.FETCH_SUCCESS,
    applicationsArray: applicationData,
  };
};

export const fetchApplication = (token, userId) => {
  return (dispatch) => {
    const queryParam = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    dispatch(fetchStart());
    axios
      .get('https://loan-application-formik.firebaseio.com/applications.json' + queryParam)
      .then((res) => {
        console.log('actions - fetchApplication(): response.data', res.data);
        let fetchedApplications = [];
        for (let key in res.data) {
          fetchedApplications.push({
            ...res.data[key],
            appId: key,
          });
        }
        dispatch(fetchSuccess(fetchedApplications));
      })
      .catch((err) => {
        dispatch(fetchFail(err));
      });
  };
};
