import React, { useEffect, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import { useDispatch, useSelector } from 'react-redux';
import * as actionAuth from '../../store/actions/index';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import MyBackdrop from '../../component/UI/CustomUI/BackDrop/MyBackdrop';
import Spinner from '../../component/UI/CustomUI/Spinner/Spinner';

import classModule from './UserForm.module.css';

// Component lazy load
// #region
const CreateAccount = React.lazy(() => {
  return import('../../component/Auth/CreateAccount/CreateAccount');
});

const Login = React.lazy(() => {
  return import('../../component/Auth/Login/Login');
});

const Logout = React.lazy(() => {
  return import('../../component/Auth/Logout');
});

const Home = React.lazy(() => {
  return import('../../component/Home/Home');
});

const FormPersonal = React.lazy(() => {
  return import('../../component/Form/Personal/Personal');
});

const FormContact = React.lazy(() => {
  return import('../../component/Form/FormContact');
});

const FormIncome = React.lazy(() => {
  return import('../../component/Form/Income/Income');
});

const FormSignature = React.lazy(() => {
  return import('../../component/Form/Signature/Signature');
});

const FormConfirm = React.lazy(() => {
  return import('../../component/Form/Confirm/Confirm');
});

const FormSuccess = React.lazy(() => {
  return import('../../component/Form/Success/Success');
});

const AccountDashboard = React.lazy(() => {
  return import('../../component/Account/AccountDashboard');
});
// #endregion

const UserForm = (props) => {
  console.log('<UserForm /> RENDER');
  // console.log('<UserForm /> location', props.location);
  const dispatch = useDispatch();

  const isAuthenticatedREDUX = useSelector((state) => state.auth.token !== null);
  console.log('<UserForm /> isAuthenticatedREDUX', isAuthenticatedREDUX);
  // const onCheckLoginState = () => dispatch(actionAuth.checkLoginState());
  // console.log('<UserForm /> isAuthenticatedREDUX', isAuthenticatedREDUX);

  useEffect(() => {
    console.log('<UserForm /> useEffect checkLoginState()');
    dispatch(actionAuth.checkLoginState());
  }, [dispatch]);

  let routes = (
    <React.Fragment>
      {/* <TransitionGroup className={classModule.TransitionGroup}>
        <CSSTransition
          key={location.key}
          timeout={200}
          mountOnEnter
          unmountOnExit
          classNames={{
            enter: classModule.fadeEnter,
            enterActive: classModule.fadeEnterActive,
            exitActive: classModule.fadeExit,
            exit: classModule.fadeExitActive,
          }}
        > */}
      {/* <section className={classModule.RouteSection}> */}
      <Switch>
        <Route
          exact
          path="/signup"
          render={(props) => <CreateAccount {...props} pathNext={'/personalinfo'} />}
        />
        <Route
          exact
          path="/login"
          render={(props) => <Login {...props} pathNext={'/accountdashboard'} />}
        />
        <Route exact path="/logout" component={Logout} />
        <ProtectedRoute
          exact
          path="/personalinfo"
          component={FormPersonal}
          redirect="/login"
          pathNext={'/employerinfo'}
        />
        <ProtectedRoute
          exact
          path="/employerinfo"
          component={FormIncome}
          redirect="/login"
          pathNext={'/signature'}
          pathPrev={'/employerinfo'}
        />
        <ProtectedRoute
          exact
          path="/signature"
          component={FormSignature}
          redirect="/login"
          pathNext={'/confirm'}
          pathPrev={'/employerinfo'}
        />
        <ProtectedRoute
          exact
          path="/confirm"
          component={FormConfirm}
          redirect="/login"
          pathNext={'/success'}
          pathPrev={'/signature'}
        />
        <ProtectedRoute
          exact
          path="/success"
          component={FormSuccess}
          redirect="/login"
          pathNext={'/accountdashboard'}
        />
        <ProtectedRoute
          exact
          path="/accountdashboard"
          component={AccountDashboard}
          redirect="/login"
        />
        <Route exact path="/" component={Home} />
        <Route path="*" render={() => <p>Page Not Found</p>} />
        <Redirect to="/" />
      </Switch>
      {/* </section> */}
      {/* </CSSTransition>
      </TransitionGroup> */}
    </React.Fragment>
  );

  const loading = (
    <React.Fragment>
      <MyBackdrop />
      <Spinner />
    </React.Fragment>
  );

  return <Suspense fallback={loading}>{routes}</Suspense>;
};

export default UserForm;
