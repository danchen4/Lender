import React, { useEffect, Suspense } from 'react';
// Router
import { Route, Switch, Redirect } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import * as actionAuth from './store/actions/index';
// Misc.
import ProtectedRoute from './hoc/ProtectedRoute';
// CSS
import classModule from './App.module.css';
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
  const dispatch = useDispatch();
  const isAuthenticatedREDUX = useSelector((state) => state.auth.token !== null);

  useEffect(() => {
    dispatch(actionAuth.checkLoginState());
  }, [dispatch]);

  let routes = (
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
  );

  const loading = (
    <React.Fragment>
      <MyBackdrop />
      <Spinner />
    </React.Fragment>
  );

  return (
    <div className={classModule.App}>
      <Layout>
        <Suspense fallback={loading}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

export default App;
