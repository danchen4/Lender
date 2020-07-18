import * as actionTypes from '../actions/actionTypes';
import { cloneDeep } from 'lodash';

const initialState = {
  personalData: {
    firstName: { label: 'First Name', value: '' },
    lastName: { label: 'Last Name', value: '' },
    address1: { label: 'Street Address 1', value: '' },
    address2: { label: 'Street Address 2', value: '' },
    city: { label: 'City', value: '' },
    state: { label: 'State', value: '' },
    zip: { label: 'Zip Code', value: '' },
    phone: { label: 'Phone Number', value: '' },
  },
  incomeData: [],
  error: null,
  loading: false,
};

const setPersonalData = (state, action) => {
  const userPersonalDataCopy = cloneDeep(state.personalData);
  for (let key in userPersonalDataCopy) {
    userPersonalDataCopy[key].value = action.userPersonalData[key];
  }
  return {
    ...state,
    personalData: userPersonalDataCopy,
  };
};

const addIncomeArray = (state, action) => {
  return {
    ...state,
    incomeData: state.incomeData.concat(action.incomeDataObject),
  };
};

const setIncomeArray = (state, action) => {
  return {
    ...state,
    incomeData: action.incomeArray,
  };
};

const deleteIncomeArray = (state, action) => {
  let incomeDataArrayCopy = cloneDeep(state.incomeData);
  incomeDataArrayCopy.splice(action.index, 1);
  return {
    ...state,
    incomeData: incomeDataArrayCopy,
  };
};

const udpateIncomeArray = (state, action) => {
  let incomeDataArrayCopy = cloneDeep(state.incomeData);
  incomeDataArrayCopy.splice(action.index, 1, action.incomeDataObject);
  return {
    ...state,
    incomeData: incomeDataArrayCopy,
  };
};

const editIncomeArray = (state, action) => {
  const incomeDataArrayCopy = cloneDeep(state.incomeData);
  incomeDataArrayCopy[action.index].edit = action.editable;
  return {
    ...state,
    incomeData: incomeDataArrayCopy,
  };
};

const clearApplicationData = (state, action) => {
  const userPersonalDataCleared = cloneDeep(state.personalData);
  for (let key in userPersonalDataCleared) {
    userPersonalDataCleared[key].value = '';
  }

  const incomeDataCleared = [];

  return {
    ...state,
    personalData: userPersonalDataCleared,
    incomeData: incomeDataCleared,
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PERSONAL_DATA:
      return setPersonalData(state, action);
    case actionTypes.ADD_INCOME_ARRAY:
      return addIncomeArray(state, action);
    case actionTypes.SET_INCOME_ARRAY:
      return setIncomeArray(state, action);
    case actionTypes.DELETE_INCOME_ARRAY:
      return deleteIncomeArray(state, action);
    case actionTypes.UPDATE_INCOME_ARRAY:
      return udpateIncomeArray(state, action);
    case actionTypes.EDIT_INCOME_ARRAY:
      return editIncomeArray(state, action);
    case actionTypes.CLEAR_APPLICATION_DATA:
      return clearApplicationData(state, action);
    default:
      return state;
  }
};
