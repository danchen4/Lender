import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Button, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { customTheme } from '../../../theme';

import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import MyTextField from '../../UI/FormikMUI/fkmui-textfield-outline/fkmui-textfield-outline';
import MyPasswordTextField from '../../UI/FormikMUI/fkmui-textfield-password/fkmui-textfield-password';
import Spinner from '../../UI/CustomUI/Spinner/Spinner';

import classModule from './CreateAccount.module.css'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '30px',
  },
  paper: {
    width: '500px',
    margin: 'auto',
    borderRadius: '6px',
    padding: theme.spacing(5),
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
    margin: '16px 0',
  }
}));

const lowerCaseRegex = /(?=.*[a-z])/;
const upperCaseRegex = /(?=.*[A-Z])/;
const numericCaseRegex = /(?=.*[0-9])/;


const validationSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup
    .string()
    .matches(lowerCaseRegex,'Password must contain at least 1 lowercase character')
    .matches(upperCaseRegex,'Password must contain at least 1 UPPERCASE character')
    .matches(numericCaseRegex,'Password must contain at least 1 number')
    .min(6, 'Password must be at least 6 characters')
    .required(),
  passwordConfirm: Yup.string().oneOf([Yup.ref('password')], 'Password must match').required('Password must match'),
});

const initialValues = {
  email: '',
  password: '',
  passwordConfirm: '',
};

const FormUserName = (props) => {
  console.log('<CreatAccount /> RENDER');
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);

  const nextStep = () => {
    props.history.push({ pathname: '/personalinfo' });
  };

  return (
    <div className={classes.root}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (data, helpers) => {
          const authData = {
            email: data.email,
            password: data.password,
            returnSecureToken: true,
          };
          let url =
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBsThRZYZdkCxZOt2QXRDW6ARulOx6VN74';
          // helpers.setSubmitting(true);
          axios
            .post(url, authData)
            .then((response) => {
              console.log(response.data);
              helpers.setSubmitting(false);
              helpers.resetForm();
              nextStep();
            })
            .catch((err) => {
              console.log(err.response);
              if (err.response.data.error.message === 'EMAIL_EXISTS') {
                helpers.setErrors({ email: 'Email already exists' });
              }
              // helpers.setFieldError('email', 'goodbye');
            });
        }}
      >
        {({ values, errors, isSubmitting }) => (
          <Paper className={classes.paper} elevation={2}>
            <Typography variant="h4" color="secondary">
              Create An Account
            </Typography>
            <Form>
              <div className={classes.spacer}>
                <div className={classes.errorMessage}>
                  <ErrorMessage name="email" />
                </div>
                <MyTextField name="email" label="Email" customStyle={{ width: '100%' }} />
              </div>

              <div className={classes.spacer}>
                <div className={classes.errorMessage}>
                    <ErrorMessage name="password" />
                </div>
                <MyPasswordTextField name="password" label="Password" required customStyle={{ width: '100%' }} />
              </div>

              <div className={classes.spacer}>
                <div className={classes.errorMessage}>
                    <ErrorMessage name="passwordConfirm" />
                </div>
                <MyPasswordTextField name="passwordConfirm" label="Confirm Password" required customStyle={{width: '100%'}} />
              </div>

              {isLoading ? (
                <Spinner />
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Sign Up
                </Button>
              )}

              <div className={`${classes.spacer} ${classModule.AccountSwitch}`}>
                <p>Already have an account?</p>
                <Link to="/login">Sign In</Link>
              </div>

              <pre
                style={{
                  marginTop: '40px',
                  width: '500px',
                  margin: 'auto',
                  textAlign: 'left',
                }}
              >
                {JSON.stringify(values, null, 4)}
              </pre>
              <pre
                style={{
                  marginTop: '40px',
                  width: '500px',
                  margin: 'auto',
                  textAlign: 'left',
                }}
              >
                {JSON.stringify(errors, null, 4)}
              </pre>
            </Form>
          </Paper>
        )}
      </Formik>
    </div>
  );
};

export default FormUserName;
