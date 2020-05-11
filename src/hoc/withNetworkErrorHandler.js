import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyBackdrop from '../component/UI/CustomUI/BackDrop/MyBackdrop';
import MyModal from '../component/UI/CustomUI/Modal/MyModal';
import useHttpErrorHandler from '../hooks/http-error-handler';

export const withNetworkErrorHandler = (MyComponent) => {
  return (props) => {
    // const [error, setError] = useState(null);

    // const requestInterceptor = axios.interceptors.request.use((response) => {
    //   setError(null);
    //   return response;
    // });

    // const responseInterceptor = axios.interceptors.response.use(
    //   (response) => response,
    //   (err) => {
    //     setError(err);
    //   }
    // );

    // useEffect(() => {
    //   return () => {
    //     axios.interceptors.request.eject(requestInterceptor);
    //     axios.interceptors.response.eject(responseInterceptor);
    //   };
    // }, [requestInterceptor, responseInterceptor]);

    // const clearErrorHandler = () => {
    //   setError(false);
    // };

    const [error, clearError] = useHttpErrorHandler(axios);

    let output = (
      <React.Fragment>
        <p>PPOOOPY</p>
        <MyComponent {...props} />
      </React.Fragment>
    );
    if (error) {
      output = (
        <React.Fragment>
          <MyBackdrop clicked={clearError} />
          <MyModal clicked={clearError} />
          <MyComponent {...props} />
        </React.Fragment>
      );
    }

    return output;
  };
};

export default withNetworkErrorHandler;
