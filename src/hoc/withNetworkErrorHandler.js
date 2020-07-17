import React from 'react';
import axios from 'axios';
import MyBackdrop from '../component/UI/CustomUI/BackDrop/MyBackdrop';
import MyModal from '../component/UI/CustomUI/Modal/MyModal';
import useHttpErrorHandler from '../hooks/http-error-handler';

export const withNetworkErrorHandler = (MyComponent) => {
  return (props) => {
    const [error, clearError] = useHttpErrorHandler(axios);

    console.log('withErrorHandler', error);

    return (
      <React.Fragment>
        {error && <MyBackdrop clicked={clearError} />}
        {error && <MyModal clicked={clearError}>{error ? error.message : null}</MyModal>}
        <MyComponent {...props} />
      </React.Fragment>
    );
  };
};

export default withNetworkErrorHandler;
