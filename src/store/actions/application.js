import * as actionTypes from './actionTypes';

export const setPersonalData = (userPersonalData) => {
  return {
    type: actionTypes.SET_PERSONAL_DATA,
    userPersonalData: userPersonalData,
  };
};

export const addIncomeArray = (incomeDataObject) => {
  return {
    type: actionTypes.ADD_INCOME_ARRAY,
    incomeDataObject: incomeDataObject,
  };
};

export const deleteIncomeArray = (index) => {
  return {
    type: actionTypes.DELETE_INCOME_ARRAY,
    index: index,
  };
};

export const udpateIncomeArray = (incomeDataObject, index) => {
  return {
    type: actionTypes.UPDATE_INCOME_ARRAY,
    incomeDataObject: incomeDataObject,
    index: index,
  };
};

export const editIncomeArray = (index, editable) => {
  return {
    type: actionTypes.EDIT_INCOME_ARRAY,
    index: index,
    editable: editable,
  };
};

export const clearApplicationData = () => {
  return {
    type: actionTypes.CLEAR_APPLICATION_DATA,
  };
};
