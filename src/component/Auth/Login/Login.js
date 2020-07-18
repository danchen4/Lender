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
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
// Components
import { MyPasswordTextField } from '../../UI/FormikMUI/fkmui-textfield-password/fkmui-textfield-password';
import { MyTextField } from '../../UI/FormikMUI/fkmui-textfield-outline/fkmui-textfield-outline';
import { Spacer } from '../../UI/Styled/Spacer';
import { ScCard, ScHeader } from '../../UI/Styled';
import { ScTextBox } from '../../UI/Styled/ScTextBox';
import { ScButton } from '../../UI/Styled/ScButton';
// CSS
import classModule from './Login.module.css';
// Misc.
import withNetworkErrorHandler from '../../../hoc/withNetworkErrorHandler';
import { FormikData } from '../../../helper/FormikData';

const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.secondary.main,
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
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
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
          <ScCard>
            <ScHeader as="h2" fontSize={2.6} fontWeight={400} color="secondary" mBot={1} mTop={2}>
              Log In
            </ScHeader>

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
              <ScButton variant="secondary" type="submit" disabled={!dirty || !isValid || loading}>
                Log In
                <KeyboardArrowRightIcon />
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
              </ScButton>

              <Spacer>
                <div className={classModule.AccountSwitch}>
                  <ScTextBox secondary weight={700}>
                    Don't have an account?
                  </ScTextBox>
                  <Link to="/signup" className={classes.link}>
                    Sign Up
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

export default withNetworkErrorHandler(SignIn);
