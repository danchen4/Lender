import React, { useEffect, Suspense } from 'react';
// Router
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
//
import { useDispatch, useSelector } from 'react-redux';
import * as actionAuth from './store/actions/index';
// Misc.
import ProtectedRoute from './hoc/ProtectedRoute';
import { AuthContextProvider } from './context/auth-context';
// CSS
import classModule from './App.module.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

// Components
import MyBackdrop from './component/UI/CustomUI/BackDrop/MyBackdrop';
import Spinner from './component/UI/CustomUI/Spinner/Spinner';
import Layout from './container/Layout/Layout';

// Component lazy load
// #region
const CreateAccount = React.lazy(() => {
  return import('./component/Auth/CreateAccount/CreateAccount');
});

const Login = React.lazy(() => {
  return import('./component/Auth/Login/Login');
});

const Logout = React.lazy(() => {
  return import('./component/Auth/Logout');
});

const Home = React.lazy(() => {
  return import('./component/Home/Home');
});

const FormPersonal = React.lazy(() => {
  return import('./component/Form/Personal/Personal');
});

const FormIncome = React.lazy(() => {
  return import('./component/Form/Income/Income');
});

const FormSignature = React.lazy(() => {
  return import('./component/Form/Signature/Signature');
});

const FormConfirm = React.lazy(() => {
  return import('./component/Form/Confirm/Confirm');
});

const FormSuccess = React.lazy(() => {
  return import('./component/Form/Success/Success');
});

const AccountDashboard = React.lazy(() => {
  return import('./component/Account/AccountDashboard');
});
// #endregion

export const App = (props) => {
  console.log('<UserForm /> RENDER');
  // console.log('<UserForm /> location', props.location);
  const dispatch = useDispatch();

  const isAuthenticatedREDUX = useSelector((state) => state.auth.token !== null);
  console.log('<UserForm /> isAuthenticatedREDUX', isAuthenticatedREDUX);
  // const onCheckLoginState = () => dispatch(actionAuth.checkLoginState());
  // console.log('<UserForm /> isAuthenticatedREDUX', isAuthenticatedREDUX);
  const location = useLocation();

  useEffect(() => {
    console.log('<UserForm /> useEffect checkLoginState()');
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
                pathPrev={'/personalinfo'}
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
          </section>
        </CSSTransition>
      </TransitionGroup>
    </React.Fragment>
  );

  const loading = (
    <React.Fragment>
      <MyBackdrop />
      <Spinner />
    </React.Fragment>
  );

  return (
    <div className={classModule.App}>
      <AuthContextProvider>
        <Layout>
          <Suspense fallback={loading}>{routes}</Suspense>
        </Layout>
      </AuthContextProvider>
    </div>
  );
};

export default App;
