import { useEffect, useReducer } from 'react';

const initialState = {
  appNumber: 500000,
};

const appNumberReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD':
      return {
        appNumber: state.appNumber++,
      };
    default:
      throw new Error('You FUCKED UP.  Should not get here');
  }
};

export default () => {
  const [state, dispatch] = useReducer(appNumberReducer, initialState);
  useEffect(() => {
    dispatch({ type: 'ADD' });
  }, []);

  return state.appNumber;
};
