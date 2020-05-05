import React, { useState, useEffect, useCallback, useContext, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { cloneDeep } from 'lodash';

import Backdrop from '../UI/CustomUI/BackDrop/Backdrop';

import { AuthContext } from '../../context/auth-context';
import Spinner from '../UI/CustomUI/Spinner/Spinner';

// Component lazy load
// #region
const CreateAccount = React.lazy(() => {
  return import('../Auth/CreateAccount/CreateAccount');
});

const Login = React.lazy(() => {
  return import('../Auth/Login/Login');
});

const Logout = React.lazy(() => {
  return import('../Auth/Logout');
});

const FormPersonal = React.lazy(() => {
  return import('./FormPersonal');
});

const FormContact = React.lazy(() => {
  return import('./FormContact');
});

const FormEmployer = React.lazy(() => {
  return import('./FormEmployer');
});

const FormEmployer2 = React.lazy(() => {
  return import('./FormEmployer2');
});

const FormSignature = React.lazy(() => {
  return import('./FormSignature');
});

const FormConfirm = React.lazy(() => {
  return import('./FormConfirm');
});

const FormSuccess = React.lazy(() => {
  return import('./FormSuccess');
});
// #endregion

const UserForm = (props) => {
  console.log('<UserForm /> RENDER');
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.checkLoginState();
  }, [authContext]);

  const [userInputValues, setUserInputValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
  });

  const [incomeArray, setIncomeArray] = useState([]);

  const setUserInputValuesHandler = useCallback(
    (values) => {
      setUserInputValues({
        ...userInputValues,
        ...values,
      });
    },
    [userInputValues]
  );

  const addIncomeDataHandler = (incomeDataObject) => {
    const incomeArrayCopy = cloneDeep(incomeArray);
    incomeArrayCopy.push(incomeDataObject);
    setIncomeArray(incomeArrayCopy);
  };

  const deleteIncomeDataHandler = (index) => {
    const incomeArrayCopy = cloneDeep(incomeArray);
    incomeArrayCopy.splice(index, 1);
    setIncomeArray(incomeArrayCopy);
  };

  const editIncomeDataHandler = (index) => {
    const incomeArrayCopy = cloneDeep(incomeArray);
    incomeArrayCopy[index].edit = true;
    setIncomeArray(incomeArrayCopy);
  };

  const updateIncomeDataHandler = (incomeDataObject, index) => {
    const incomeArrayCopy = cloneDeep(incomeArray);
    incomeArrayCopy.splice(index, 1, incomeDataObject);
    setIncomeArray(incomeArrayCopy);
  };

  let routes = (
    <React.Fragment>
      <Switch>
        <Route path="/signup" exact component={CreateAccount} />
        <Route path="/login" exact component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={Login} />
        <Redirect to="/" />
      </Switch>
    </React.Fragment>
  );
    
  if (authContext.isAuth) {
    routes = (
      <React.Fragment>
        <Switch>
          <Route path="/signup" exact component={CreateAccount} />
          <Route path="/login" exact component={Login} />
          <Route
            path="/personalinfo"
            render={(props) => (
              <FormPersonal
                {...props}
                userValues={userInputValues}
                setUserValues={setUserInputValuesHandler}
              />
            )}
          />
          {/* <Route
            path="/contactinfo"
            render={(props) => <FormContact {...props} values={employerInputValues} setInputValues={setInputValuesHandler} />}
          /> */}
          <Route
            path="/employerinfo"
            render={(props) => (
              <FormEmployer2
                {...props}
                incomeArray={incomeArray}
                addIncomeData={addIncomeDataHandler}
                deleteIncomeData={deleteIncomeDataHandler}
                editIncomeData={editIncomeDataHandler}
                updateIncomeData={updateIncomeDataHandler}
              />
            )}
          />
          <Route
            path="/signature"
            render={(props) => <FormSignature {...props} userValues={userInputValues} />}
          />
          <Route
            path="/confirm"
            render={(props) => (
              <FormConfirm {...props} userValues={userInputValues} incomeArray={incomeArray} />
            )}
          />
          <Route path="/success" component={FormSuccess} />
          <Route path="/logout" component={Logout} />
          <Route
            path="/"
            render={(props) => (
              <FormPersonal
                {...props}
                userValues={userInputValues}
                setUserValues={setUserInputValuesHandler}
              />
            )}
          />
          <Redirect to="/" />
        </Switch>
      </React.Fragment>
    );
  }

  const loading = (
    <React.Fragment>
      <Backdrop />
      <Spinner/>
    </React.Fragment>
  );

  return <Suspense fallback={loading}>{routes}</Suspense>;
};

export default UserForm;
