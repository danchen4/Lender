import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ component: Component, redirect, pathPrev, pathNext, ...rest }) => {
  const token = localStorage.getItem('token');

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <Component {...props} pathPrev={pathPrev} pathNext={pathNext} />
        ) : (
          <Redirect to={redirect} />
        )
      }
    ></Route>
  );
};

ProtectedRoute.propTypes = {
  redirect: PropTypes.string.isRequired,
};

export default ProtectedRoute;
