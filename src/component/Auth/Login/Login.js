import React from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import * as actionAuth from '../../../store/actions/index';
// Router
import { Link } from 'react-router-dom';
// Formik/Yup
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
// Material UI
import { Button, Typography, Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { customTheme } from '../../../theme/theme';
import CircularProgress from '@material-ui/core/CircularProgress';
import { purple } from '@material-ui/core/colors';
// Components
import { MyPasswordTextField } from '../../UI/FormikMUI/fkmui-textfield-password/fkmui-textfield-password';
import { MyTextField } from '../../UI/FormikMUI/fkmui-textfield-outline/fkmui-textfield-outline';
// CSS
import classModule from './Login.module.css';
// Misc.
import withNetworkErrorHandler from '../../../hoc/withNetworkErrorHandler';
import { Spacer } from '../../UI/CustomUI/Spacer/Spacer';

const useStyles = makeStyles((theme) => ({
  box: {
    padding: '0.5rem',
  },
  paper: {
    maxWidth: '600px',
    margin: '0 auto',
    borderRadius: '6px',
    padding: theme.spacing(3),
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

const validationSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const initialValues = {
  email: '',
  password: '',
};

const SignIn = ({ pathNext, history }) => {
  console.log('<Login /> RENDER');
  const classes = useStyles();

  const dispatch = useDispatch();
  const loadingREDUX = useSelector((state) => state.auth.loading);
  const onLogin = (values, actions, isSignUp, redirect, history) =>
    dispatch(actionAuth.loginAccount(values, actions, isSignUp, redirect, history));

  const submitHandler = async (values, actions) => {
    actions.setSubmitting(true);
    //nextStep is executed through onLogin action creator
    await onLogin(values, actions, false, pathNext, history);
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
              <Spacer margin={3}>
                <Typography variant="h2" color="secondary">
                  Log In
                </Typography>
              </Spacer>
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
                {/* <div className={classes.spacer}>
                <MyTextField name="passwordConfirm" label="Confirm Password" customStyle={{width: '100%'}} />
              </div> */}

                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  type="submit"
                  disabled={!dirty || !isValid || loadingREDUX}
                >
                  Login
                </Button>
                {loadingREDUX && <CircularProgress size={24} className={classes.buttonProgress} />}
                <Spacer>
                  <div className={classModule.AccountSwitch}>
                    <p>Don't have an account?</p>
                    <Link to="/signup" className={classModule.Link}>
                      Sign Up
                    </Link>
                  </div>
                </Spacer>

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

export default withNetworkErrorHandler(SignIn);
