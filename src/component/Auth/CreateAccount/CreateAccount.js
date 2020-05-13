import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actionAuth from '../../../store/actions/index';
import { Link } from 'react-router-dom';

import { Button, Typography, Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { customTheme } from '../../../theme';
import { purple } from '@material-ui/core/colors';

import MyTextField from '../../UI/FormikMUI/fkmui-textfield-outline/fkmui-textfield-outline';
import MyPasswordTextField from '../../UI/FormikMUI/fkmui-textfield-password/fkmui-textfield-password';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import classModule from './CreateAccount.module.css';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '30px',
  },
  box: {
    padding: '0.5rem',
  },
  paper: {
    maxWidth: '600px',
    margin: 'auto',
    borderRadius: '6px',
    padding: theme.spacing(3),
  },
  textField: {
    width: '90%',
  },
  spacer: {
    margin: '24px 0',
  },
  button: {
    margin: '1rem',
    backgroundColor: customTheme.palette.primary.dark,
  },
  valueDisplay: {
    marginTop: '40px',
    width: '500px',
    margin: 'auto',
    textAlign: 'left',
  },
  buttonProgress: {
    color: purple[200],
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

const CreateAccount = (props) => {
  console.log('<CreatAccount /> RENDER');
  const classes = useStyles();
  const { history, pathNext } = props;

  const dispatch = useDispatch();

  const loadingREDUX = useSelector((state) => state.auth.loading);
  const onLogin = (values, actions, isSignUp) =>
    dispatch(actionAuth.loginAccount(values, actions, isSignUp));
  // const onSetRedirectPath = (path) => dispatch(actionAuth.setAuthRedirectPath(path));

  const nextStep = () => {
    history.push({ pathname: pathNext });
  };

  const submitHandler = async (values, actions, isSignUp) => {
    // setIsLoading(true);
    actions.setSubmitting(true);
    setTimeout(() => {
      onLogin(values, actions, isSignUp);
      actions.setSubmitting(false);
      actions.resetForm();
      // setIsLoading(false);
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
          <Box component="div" className={classes.box}>
            <Paper className={classes.paper} elevation={2}>
              <Typography variant="h4" color="secondary">
                Create An Account
              </Typography>
              <Form>
                <div className={classes.spacer}>
                  <MyTextField name="email" label="Email" customStyle={{ width: '100%' }} />
                </div>

                <div className={classes.spacer}>
                  <MyPasswordTextField
                    name="password"
                    label="Password"
                    required
                    customStyle={{ width: '100%' }}
                  />
                </div>

                <div className={classes.spacer}>
                  <MyPasswordTextField
                    name="passwordConfirm"
                    label="Confirm Password"
                    required
                    customStyle={{ width: '100%' }}
                  />
                </div>

                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  type="submit"
                  disabled={!dirty || !isValid || loadingREDUX}
                >
                  Sign Up
                </Button>
                {loadingREDUX && <CircularProgress size={24} className={classes.buttonProgress} />}

                <div className={`${classes.spacer} ${classModule.AccountSwitch}`}>
                  <p>Already have an account?</p>
                  <Link to="/login">Sign In</Link>
                </div>

                <pre className={classes.valueDisplay}>{JSON.stringify(values, null, 4)}</pre>
                <pre className={classes.valueDisplay}>{JSON.stringify(errors, null, 4)}</pre>
              </Form>
            </Paper>
          </Box>
        )}
      </Formik>
    </div>
  );
};

export default CreateAccount;
