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
import { CircularSpinner } from '../../UI/CustomMUI';
// CSS
import classModule from './CreateAccount.module.css';
// Misc.
import { FormikData } from '../../../helper/FormikData';
import { ErrorModal } from '../../Error/ErrorModal';
import { HEADER_FORMAT_3 } from '../../../constants';

const LOWERCASE_REGEX = /(?=.*[a-z])/;
const UPPERCASE_REGEX = /(?=.*[A-Z])/;
const NUMERICCASE_REGEX = /(?=.*[0-9])/;

const validationSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string()
    .matches(LOWERCASE_REGEX, 'Password must contain at least 1 lowercase character')
    .matches(UPPERCASE_REGEX, 'Password must contain at least 1 UPPERCASE character')
    .matches(NUMERICCASE_REGEX, 'Password must contain at least 1 number')
    .min(6, 'Password must be at least 6 characters')
    .required(),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password')], 'Password must match')
    .required('Password must match'),
});

const initialValues = {
  email: '',
  password: '',
  passwordConfirm: '',
};

const CreateAccount = ({ history, pathNext }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const onLogin = (values, actions, isSignUp, redirect, history) =>
    dispatch(actionAuth.loginAccount(values, actions, isSignUp, redirect, history));
  const onGuestLogin = (redirect, history) =>
    dispatch(actionAuth.guestLoginAccount(redirect, history));

  const submitHandler = async (values, actions) => {
    actions.setSubmitting(true);
    await onLogin(values, actions, true, pathNext, history);
    actions.setSubmitting(false);
    actions.resetForm();
  };

  return (
    <>
      <ScCard shadow="SmoothXs">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(actions, values) => {
            submitHandler(actions, values);
          }}
        >
          {({ values, errors, status, dirty, isValid }) => (
            <>
              {status && <ErrorModal message={status} />}

              <ScHeader {...HEADER_FORMAT_3}>Create an account</ScHeader>
              <ScTextBox>
                Start off by creating an account. By creating an account, you can save your progress
                and stay updated on your loans.
              </ScTextBox>
              <Form>
                <Spacer>
                  <MyTextField name="email" label="Email" customStyle={{ width: 100 }} />
                </Spacer>
                <Spacer>
                  <MyPasswordTextField
                    name="password"
                    label="Password"
                    required
                    customStyle={{ width: 100 }}
                  />
                </Spacer>
                <Spacer>
                  <MyPasswordTextField
                    name="passwordConfirm"
                    label="Confirm Password"
                    required
                    customStyle={{ width: 100 }}
                  />
                </Spacer>
                <ScButton
                  variant="secondary"
                  type="submit"
                  disabled={!dirty || !isValid || loading}
                >
                  Sign Up
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

        <Spacer nTop={1.8}>
          <div className={classModule.AccountSwitch}>
            <ScTextBox color="text" colorGrade="light" weight={500}>
              Already have an account?
            </ScTextBox>
            <ScLink to="/login" color="secondary">
              Sign In
            </ScLink>
          </div>
        </Spacer>
      </ScCard>
    </>
  );
};

export default CreateAccount;
