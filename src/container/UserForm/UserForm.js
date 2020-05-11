import React, { useState, useEffect, useCallback, useContext, Suspense } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
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

const UserForm = ({ location }) => {
  console.log('<UserForm /> RENDER');

  const dispatch = useDispatch();

  const isAuthenticatedREDUX = useSelector((state) => state.auth.token);
  // const onCheckLoginState = () => dispatch(actionAuth.checkLoginState());

  useEffect(() => {
    dispatch(actionAuth.checkLoginState());
  }, [dispatch]);

  let routes = (
    <React.Fragment>
      <TransitionGroup className={classModule.TransitionGroup}>
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
        >
          <section className={classModule.RouteSection}>
            <Switch location={location}>
              <Route exact path="/signup" component={CreateAccount} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/logout" component={Logout} />
              <Route exact path="/" component={Login} />
              <Redirect to="/" />
            </Switch>
          </section>
        </CSSTransition>
      </TransitionGroup>
    </React.Fragment>
  );

  if (isAuthenticatedREDUX) {
    routes = (
      <React.Fragment>
        {/* <TransitionGroup className={classModule.TransitionGroup}>
          <CSSTransition
            key={location.key}
            timeout={200}
            classNames={{
              enter: classModule.fadeEnter,
              enterActive: classModule.fadeEnterActive,
              exitActive: classModule.fadeExit,
              exit: classModule.fadeExitActive,
              appear: classModule.fadeAppear,
              appearActive: classModule.fadeAppearActive,
            }}
          >
            <section className={classModule.RouteSection}> */}
        <Switch>
          <Route
            exact
            path="/personalinfo"
            render={(props) => <FormPersonal {...props} pathNext={'/employerinfo'} />}
          />
          <Route
            path="/employerinfo"
            render={(props) => (
              <FormIncome {...props} pathNext={'/signature'} pathPrev={'/personalinfo'} />
            )}
          />
          <Route
            path="/signature"
            render={(props) => (
              <FormSignature {...props} pathNext={'/confirm'} pathPrev={'/employerinfo'} />
            )}
          />
          <Route
            path="/confirm"
            render={(props) => (
              <FormConfirm {...props} pathNext={'/success'} pathPrev={'/signature'} />
            )}
          />
          <Route
            path="/success"
            render={(props) => <FormSuccess {...props} pathNext={'/accountdashboard'} />}
          />
          <Route
            exact
            path="/accountdashboard"
            render={(props) => <AccountDashboard {...props} />}
          />
          <Route path="/logout" component={Logout} />
          {/* <Route path="/" render={(props) => <AccountDashboard {...props} />} /> */}
          <Route
            path="/"
            render={(props) => (
              <FormConfirm {...props} pathNext={'/success'} pathPrev={'/signature'} />
            )}
          />
          <Redirect to="/" />
        </Switch>
        {/* </section>
          </CSSTransition>
        </TransitionGroup> */}
      </React.Fragment>
    );
  }

  const loading = (
    <React.Fragment>
      <MyBackdrop />
      <Spinner />
    </React.Fragment>
  );

  return <Suspense fallback={loading}>{routes}</Suspense>;
};

export default withRouter(UserForm);
