import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions/index';
import { Redirect } from 'react-router-dom';

const Logout = (props) => {
  const dispatch = useDispatch();
  const onSetLogoutAccount = () => dispatch(actions.logoutAccount());

  useEffect(() => {
    onSetLogoutAccount();
  }, []);

  return <Redirect to="/login" />;
};

export default Logout;
