import React from 'react';

import { Button, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { customTheme } from '../../theme';

// import Input from '../UI/Input'

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import MyTextField from '../UI/FormikMUI/fkmui-textfield-outline/fkmui-textfield-outline';
import MySelectStates from '../UI/FormikMUI/fkmui-select-states/fkmui-select-states';

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
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    margin: '1rem',
    backgroundColor: customTheme.palette.primary.dark,
  },
}));

const validationSchema = Yup.object({
  address1: Yup.string().required().max(30),
  address2: Yup.string().max(30),
  city: Yup.string().required(),
  state: Yup.string().required(),
  zip: Yup.number('Zip code must be a number').required(),
});

const FormPersonal = (props) => {
  console.log('<FormContact /> RENDER');

  const classes = useStyles();
  const { values, setInputValues } = props;

  const initialValues = {
    address1: values.address1 || '',
    address2: values.address2 || '',
    city: values.city || '',
    state: values.state || '',
    zip: values.zip || '',
  };

  const nextStep = () => {
    props.history.push({ pathname: '/confirm' });
  };

  const prevStep = () => {
    props.history.push({ pathname: '/employerinfo' });
  };

  return (
    <div className={classes.root}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (data, helpers) => {
          helpers.setSubmitting(true);
          await setTimeout(() => {
            console.log(data);
            setInputValues(data);
            helpers.setSubmitting(false);
            helpers.resetForm();
            nextStep();
          }, 2000);
        }}
      >
        {({ values, errors, isSubmitting, dirty, isValid }) => (
          <Paper className={classes.paper} elevation={2}>
            <Typography variant="h4" color="secondary">
              Contact Information
            </Typography>
            <Form>
              <div className={classes.spacer}>
                <MyTextField
                  name="address1"
                  label="Address Field 1"
                  required
                  customStyle={{ width: '100%' }}
                />
              </div>

              <div className={classes.spacer}>
                <MyTextField
                  name="address2"
                  label="Address Field 2"
                  customStyle={{ width: '100%' }}
                />
              </div>

              <div className={`${classes.spacer} ${classes.flex}`}>
                <MyTextField name="city" label="City" required customStyle={{ width: '50%' }} />
                <MySelectStates
                  name="state"
                  label="State"
                  required
                  customStyle={{ width: '20%' }}
                />
                <MyTextField name="zip" label="ZIP Code" required customStyle={{ width: '25%' }} />
              </div>

              <Button
                variant="contained"
                color="secondary"
                size="large"
                className={classes.button}
                onClick={prevStep}
              >
                Back
              </Button>

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

export default FormPersonal;
