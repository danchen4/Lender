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
import { Button, Typography, Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { customTheme } from '../../../theme/theme';
import { purple } from '@material-ui/core/colors';
// Components
import { MyTextField } from '../../UI/FormikMUI/fkmui-textfield-outline/fkmui-textfield-outline';
import { MyPasswordTextField } from '../../UI/FormikMUI/fkmui-textfield-password/fkmui-textfield-password';
//
import classModule from './CreateAccount.module.css';
// Misc.
import withNetworkErrorHandler from '../../../hoc/withNetworkErrorHandler';
import { Spacer } from '../../UI/CustomUI/Spacer/Spacer';

const useStyles = makeStyles((theme) => ({
  box: {
    padding: '0.5rem',
  },
  paper: {
    maxWidth: '600px',
    margin: 'auto',
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
          <Box component="div" className={classes.box}>
            <Paper className={classes.paper} elevation={2}>
              <Spacer margin={3}>
                <Typography variant="h2" color="secondary">
                  Create An Account
                </Typography>
              </Spacer>
              <Form>
                <div className={classes.spacer}>
                  <MyTextField name="email" label="Email" customStyle={{ width: 100 }} />
                </div>

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

                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  type="submit"
                  disabled={!dirty || !isValid || loading}
                >
                  Sign Up
                </Button>
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}

                <Spacer>
                  <div className={classModule.AccountSwitch}>
                    <p>Already have an account?</p>
                    <Link to="/login">Sign In</Link>
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

export default withNetworkErrorHandler(CreateAccount);
