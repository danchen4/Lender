import React from 'react';

import { Button, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { customTheme } from '../../theme';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import MyTextField from '../UI/FormikMUI/fkmui-textfield-outline/fkmui-textfield-outline';
import MyMaskedTextField from '../UI/FormikMUI/fkmui-textfield-masked/fkmui-textfield-masked';

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
  spacer: {
    margin: '24px 0',
  },
  button: {
    margin: '1rem',
    backgroundColor: customTheme.palette.primary.dark,
  },
}));

const phoneNumberMask = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
const delimiter = "-";

const validationSchema = Yup.object({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  phone: Yup.string()
    .matches(/(^[0-9]+$)/, 'Please enter valid phone number')
    .required(),
});

const FormUserName = (props) => {
  const classes = useStyles();
  const { userValues, setUserValues } = props;
 
  const initialValues = {
    firstName: userValues.firstName || '',
    lastName:  userValues.lastName ||'',
    phone:  userValues.phone ||'',
  };
  console.log('<FormPersonal /> RENDER', userValues);

  const nextStep = () => {
    props.history.push({ pathname: '/signature' });
  };

  return (
    <div className={classes.root}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (data, helpers) => {
          helpers.setSubmitting(true);
          await setTimeout(() => {
            console.log('data onSubmit', data);
            setUserValues(data);
            helpers.setSubmitting(false);
            helpers.resetForm();
            nextStep();
          }, 1000);
        }}
      >
        {({ values, errors, isSubmitting, dirty, isValid }) => (
          <Paper className={classes.paper} elevation={2}>
            <Typography variant="h4" color="secondary">
              User Information
            </Typography>
            <Form>
              <div className={classes.spacer}>
                <MyTextField
                  name="firstName"
                  label="First Name"
                  required
                  customStyle={{ width: '100%' }}
                />
              </div>

              <div className={classes.spacer}>
                <MyTextField
                  name="lastName"
                  label="Last Name"
                  required
                  customStyle={{ width: '100%' }}
                />
              </div>

              <div className={classes.spacer}>
                <MyMaskedTextField
                  name="phone"
                  label="Phone Number"
                  maskInput={phoneNumberMask}
                  delimiter={delimiter}
                  required
                  customStyle={{ width: '100%' }}
                />
              </div>

              <Button
                variant="contained"
                color="secondary"
                size="large"
                type="submit"
                disabled={!dirty || !isValid || isSubmitting}
              >
                Next Step
              </Button>

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
