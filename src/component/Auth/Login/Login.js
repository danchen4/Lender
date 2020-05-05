import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import { Button, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { customTheme } from '../../../theme';
import CircularProgress from '@material-ui/core/CircularProgress';
import { purple } from '@material-ui/core/colors'

import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import MyTextField from '../../UI/FormikMUI/fkmui-textfield-outline/fkmui-textfield-outline';
import MyPasswordTextField from '../../UI/FormikMUI/fkmui-textfield-password/fkmui-textfield-password';

import { AuthContext } from '../../../context/auth-context';

import classModule from './Login.module.css'

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
  // passwordConfirm: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required(),
});

const initialValues = {
  email: '',
  password: '',
  // passwordConfirm: '',
};

const SignIn = (props) => {
  console.log('<SignIn /> RENDER');
  const classes = useStyles();
  const authContext = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);


  const nextStep = () => {
    props.history.push({ pathname: '/personalinfo' });
  };

  return (
    <div className={classes.root}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          setIsLoading(true);
          actions.setSubmitting(true);
          setTimeout(()=>{
            authContext.loginAccount(values, actions);
            actions.setSubmitting(false);
            actions.resetForm();
            setIsLoading(false);
            nextStep();
          },2000)
          

          
        }}
      >
        {({ values, errors, isSubmitting, dirty, isValid }) => (
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
                  autoFocus={true}
                  customStyle={{ width: '100%' }} />
              </div>

              <div className={classes.spacer}>
                <MyPasswordTextField 
                  name="password" 
                  label="Password" 
                  required 
                  customStyle={{width: '100%'}} />
              </div>

              {/* <div className={classes.spacer}>
                <MyTextField name="passwordConfirm" label="Confirm Password" customStyle={{width: '100%'}} />
              </div> */}

              
              {/* {isLoading && <Spinner />} */}
              <div style={{position: 'relative'}}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  type="submit"
                  disabled={!dirty || !isValid || isLoading}
                >
                    Login
                </Button>
                {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>

              <div className={`${classes.spacer} ${classModule.AccountSwitch}`}>
                <p>Don't have an account?</p>
                <Link to="/signup" className={classModule.Link}>Sign Up</Link>
              </div>

              <pre className={classes.valueDisplay}>
                {JSON.stringify(values, null, 4)}
              </pre>
              <pre className={classes.valueDisplay}>
                {JSON.stringify(errors, null, 4)}
              </pre>
            </Form>
          </Paper>
        )}
      </Formik>
    </div>
  );
};

export default SignIn;
