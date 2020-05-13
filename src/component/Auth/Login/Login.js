import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actionAuth from '../../../store/actions/index';
import { Link } from 'react-router-dom';

import { Button, Typography, Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { customTheme } from '../../../theme';
import CircularProgress from '@material-ui/core/CircularProgress';
import { purple } from '@material-ui/core/colors';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import MyTextField from '../../UI/FormikMUI/fkmui-textfield-outline/fkmui-textfield-outline';
import MyPasswordTextField from '../../UI/FormikMUI/fkmui-textfield-password/fkmui-textfield-password';

import classModule from './Login.module.css';
import withNetworkErrorHandler from '../../../hoc/withNetworkErrorHandler';
import useTraceUpdate from '../../../hooks/trace-update';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '30px',
  },
  box: {
    padding: '0.5rem',
  },
  paper: {
    maxWidth: '600px',
    margin: '0 auto',
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
  errorMessage: {
    color: 'salmon',
    margin: '20px 0',
    width: '90%',
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

const validationSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const initialValues = {
  email: '',
  password: '',
};

const SignIn = (props) => {
  console.log('<Login /> RENDER');
  console.log('<Login /> match', props.match);
  useTraceUpdate(props);

  // useTraceUpdate(props);
  const classes = useStyles();
  const { pathNext } = props;

  const dispatch = useDispatch();
  const loadingREDUX = useSelector((state) => state.auth.loading);
  const onLogin = (values, actions, isSignUp, redirect, history) =>
    dispatch(actionAuth.loginAccount(values, actions, isSignUp, redirect, history));

  const submitHandler = async (values, actions) => {
    actions.setSubmitting(true);
    //nextStep is executed through onLogin action creator
    await onLogin(values, actions, false, pathNext, props.history);
    actions.setSubmitting(false);
    actions.resetForm();
  };

  return (
    <div className={classes.root}>
      {/* {authRedirect} */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          submitHandler(values, actions);
        }}
      >
        {({ values, errors, isSubmitting, dirty, isValid }) => (
          <Box component="div" className={classes.box}>
            <Paper className={classes.paper} elevation={2}>
              <Typography variant="h4" color="secondary">
                Log In
              </Typography>
              <Form>
                <div className={classes.spacer}>
                  <MyTextField
                    name="email"
                    label="Email"
                    required
                    // autoFocus={true}
                    customStyle={{ width: '100%' }}
                  />
                </div>

                <div className={classes.spacer}>
                  <MyPasswordTextField
                    name="password"
                    label="Password"
                    required
                    customStyle={{ width: '100%' }}
                  />
                </div>

                {/* <div className={classes.spacer}>
                <MyTextField name="passwordConfirm" label="Confirm Password" customStyle={{width: '100%'}} />
              </div> */}

                <div style={{ position: 'relative' }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    type="submit"
                    disabled={!dirty || !isValid || loadingREDUX}
                  >
                    Login
                  </Button>
                  {loadingREDUX && (
                    <CircularProgress size={24} className={classes.buttonProgress} />
                  )}
                </div>

                <div className={`${classes.spacer} ${classModule.AccountSwitch}`}>
                  <p>Don't have an account?</p>
                  <Link to="/signup" className={classModule.Link}>
                    Sign Up
                  </Link>
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

export default SignIn;
