import React from 'react';
// Router
import { Link } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import * as actionAuth from '../../../store/actions/index';
// Formik/Yup
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
// Material UI
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
// Components
import { MyTextField } from '../../UI/FormikMUI/fkmui-textfield-outline/fkmui-textfield-outline';
import { MyPasswordTextField } from '../../UI/FormikMUI/fkmui-textfield-password/fkmui-textfield-password';
import { ScCard, ScHeader } from '../../UI/Styled';
import { ScTextBox } from '../../UI/Styled/ScTextBox';
import { ScButton } from '../../UI/Styled/ScButton';
import { Spacer } from '../../UI/Styled/Spacer';
// CSS
import classModule from './CreateAccount.module.css';
// Misc.
import withNetworkErrorHandler from '../../../hoc/withNetworkErrorHandler';
import { FormikData } from '../../../helper/FormikData';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    fontSize: '1.6rem',
    color: theme.palette.secondary.main,
    fontWeight: 500,
    padding: '1rem 0',
    display: 'inline-block',
  },
  buttonProgress: {
    color: theme.palette.secondary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const lowerCaseRegex = /(?=.*[a-z])/;
const upperCaseRegex = /(?=.*[A-Z])/;
const numericCaseRegex = /(?=.*[0-9])/;

const validationSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string()
    .matches(lowerCaseRegex, 'Password must contain at least 1 lowercase character')
    .matches(upperCaseRegex, 'Password must contain at least 1 UPPERCASE character')
    .matches(numericCaseRegex, 'Password must contain at least 1 number')
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
  console.log('<CreatAccount /> RENDER');
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const nextStep = () => {
    history.push({ pathname: pathNext });
  };

  const submitHandler = async (values, actions, isSignUp) => {
    actions.setSubmitting(true);
    setTimeout(() => {
      dispatch(actionAuth.loginAccount(values, actions, isSignUp));
      actions.setSubmitting(false);
      actions.resetForm();
      nextStep();
    }, 1500);
  };

  return (
    <div className={classes.root}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(actions, values) => {
          submitHandler(actions, values, true);
        }}
      >
        {({ values, errors, dirty, isValid }) => (
          <ScCard shadow="SmoothXs">
            <ScHeader as="h2" fontSize={2.6} fontWeight={400} color="secondary" mBot={1} mTop={2}>
              Create an account
            </ScHeader>
            <ScTextBox>Save your progress and stay updated on your loans</ScTextBox>
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
              <ScButton variant="secondary" type="submit" disabled={!dirty || !isValid || loading}>
                Sign Up
                <KeyboardArrowRightIcon />
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
              </ScButton>

              <Spacer>
                <div className={classModule.AccountSwitch}>
                  <ScTextBox secondary weight={700}>
                    Already have an account?
                  </ScTextBox>
                  <Link to="/login" className={classes.link}>
                    Sign In
                  </Link>
                </div>
              </Spacer>
              <FormikData values={values} errors={errors} />
            </Form>
          </ScCard>
        )}
      </Formik>
    </div>
  );
};

export default withNetworkErrorHandler(CreateAccount);
