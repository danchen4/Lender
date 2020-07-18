import * as actionTypes from './actionTypes';

export const setPersonalData = (userPersonalData) => {
  return {
    type: actionTypes.SET_PERSONAL_DATA,
    userPersonalData: userPersonalData,
  };
};

export const addIncomeArray = (incomeDataObject) => {
  const sessionIncomeData = sessionStorage.getItem('sessionIncomeData');
  // Check to see if stored in session data.  If so, then add to the array, otherwise create new array.
  if (sessionIncomeData) {
    const parsedData = JSON.parse(sessionIncomeData);
    sessionStorage.setItem(
      'sessionIncomeData',
      JSON.stringify(parsedData.concat(incomeDataObject))
    );
  } else sessionStorage.setItem('sessionIncomeData', JSON.stringify([incomeDataObject]));

  return {
    type: actionTypes.ADD_INCOME_ARRAY,
    incomeDataObject: incomeDataObject,
  };
};

export const setIncomeArray = (incomeArray) => {
  return {
    type: actionTypes.SET_INCOME_ARRAY,
    incomeArray: incomeArray,
  };
};

export const deleteIncomeArray = (index) => {
  const sessionIncomeData = sessionStorage.getItem('sessionIncomeData');
  // Check to see if stored in session data.  If so, then remove item from income array and set into session data again.
  if (sessionIncomeData) {
    const parsedData = JSON.parse(sessionIncomeData);
    parsedData.splice(index, 1);
    sessionStorage.setItem('sessionIncomeData', JSON.stringify(parsedData));
  }

  return {
    type: actionTypes.DELETE_INCOME_ARRAY,
    index: index,
  };
};

export const udpateIncomeArray = (incomeDataObject, index) => {
  const sessionIncomeData = sessionStorage.getItem('sessionIncomeData');
  // Check to see if stored in session data.  If so, then replace income array item with updated item.
  if (sessionIncomeData) {
    const parsedData = JSON.parse(sessionIncomeData);
    parsedData.splice(index, 1, incomeDataObject);
    sessionStorage.setItem('sessionIncomeData', JSON.stringify(parsedData));
  }

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

export const checkApplicationData = () => (dispatch) => {
  const userPersonalData = sessionStorage.getItem('userPersonalData');

  if (userPersonalData) dispatch(setPersonalData(JSON.parse(userPersonalData)));
};

export const checkIncomeData = (incomeDataObject) => (dispatch) => {
  const sessionIncomeData = sessionStorage.getItem('sessionIncomeData');
  if (sessionIncomeData) {
    const parsedData = JSON.parse(sessionIncomeData);
    sessionStorage.setItem(
      'sessionIncomeData',
      JSON.stringify(parsedData.concat(incomeDataObject))
    );
  } else sessionStorage.setItem('sessionIncomeData', JSON.stringify([incomeDataObject]));
};
