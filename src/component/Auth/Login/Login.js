import React from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import * as actionAuth from '../../../store/actions/index';
// Formik/Yup
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
// Material UI
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
// Components
import { MyTextField, MyPasswordTextField } from '../../UI/FormikMUI';
import { Spacer, ScCard, ScHeader, ScTextBox, ScButton, ScLink } from '../../UI/Styled';
import { ErrorModal } from '../../Error/ErrorModal';
import { CircularSpinner } from '../../UI/CustomMUI';
// CSS
import classModule from './Login.module.css';
// Misc.
import { FormikData } from '../../../helper/FormikData';
import { HEADER_FORMAT_3 } from '../../../constants';

const validationSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const initialValues = {
  email: '',
  password: '',
};

const SignIn = ({ pathNext, history }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const onLogin = (values, actions, isSignUp, redirect, history) =>
    dispatch(actionAuth.loginAccount(values, actions, isSignUp, redirect, history));
  const onGuestLogin = (redirect, history) =>
    dispatch(actionAuth.guestLoginAccount(redirect, history));

  const submitHandler = async (values, actions) => {
    actions.setSubmitting(true);

    await onLogin(values, actions, false, pathNext, history);
    actions.setSubmitting(false);
    actions.resetForm();
    //nextStep is executed through onLogin action creator
  };

  return (
    <>
      <ScCard shadow="SmoothXs">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            submitHandler(values, actions);
          }}
        >
          {({ values, errors, status, dirty, isValid }) => (
            <>
              {status && <ErrorModal message={status} />}
              <ScHeader {...HEADER_FORMAT_3}>Log In</ScHeader>
              <Form>
                <Spacer>
                  <MyTextField
                    name="email"
                    label="Email"
                    required
                    // autoFocus={true}
                    customStyle={{ width: 100 }}
                  />
                </Spacer>
                <Spacer>
                  <MyPasswordTextField
                    name="password"
                    label="Password"
                    required
                    customStyle={{ width: 100 }}
                  />
                </Spacer>
                <ScButton
                  variant="secondary"
                  type="submit"
                  disabled={!dirty || !isValid || loading}
                >
                  Log In
                  <KeyboardArrowRightIcon />
                  {loading && <CircularSpinner />}
                </ScButton>

                <FormikData values={values} errors={errors} />
              </Form>
            </>
          )}
        </Formik>

        <Spacer mTop={1} mBot={1}>
          <ScTextBox color="text" colorGrade="light" weight={500}>
            --- OR ---
          </ScTextBox>
        </Spacer>

        <ScButton variant="secondary" onClick={() => onGuestLogin(pathNext, history)}>
          Continue as Guest
          <KeyboardArrowRightIcon />
          {loading && <CircularSpinner />}
        </ScButton>

        <Spacer>
          <div className={classModule.AccountSwitch}>
            <ScTextBox color="text" colorGrade="light" weight={500}>
              Don't have an account?
            </ScTextBox>
            <ScLink to="/signup" color="secondary">
              Sign Up
            </ScLink>
          </div>
        </Spacer>
      </ScCard>
    </>
  );
};

export default SignIn;
