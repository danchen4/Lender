import React from 'react';

import { Button, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { customTheme } from '../../theme';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import MyTextField from '../UI/FormikMUI/fkmui-textfield-outline/fkmui-textfield-outline';
import MyCheckbox from '../UI/FormikMUI/fkmui-checkbox/fkmui-checkbox';
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
  valueDisplay: {
    marginTop: '40px',
    width: '500px',
    margin: 'auto',
    textAlign: 'left',
  }
}));

const phoneNumberMask = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
const delimiter = "-";

const FormUserName = (props) => {
  const classes = useStyles();
  const { userValues } = props;
  console.log('<FormPersonal /> RENDER', userValues);

  const initialValues = {
    agreeTerms: false,
    agreeSignature: false,
    signature: '',
  };

  const validationSchema = Yup.object({
    agreeTerms: Yup.boolean().oneOf([true], 'Must accept Terms and Conditions').required(),
    agreeSignature: Yup.boolean().oneOf([true], 'Must agree to electronic signature').required(),
    signature: Yup.string().trim().oneOf([`${userValues.firstName} ${userValues.lastName}`], 'Name on Signature must match exactly first and last name on application').required(),
  });
  
  const nextStep = () => {
    props.history.push({ pathname: '/confirm' });
  };

  const prevStep = () => {
    props.history.push({ pathname: '/personalinfo' });
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
            helpers.setSubmitting(false);
            helpers.resetForm();
            nextStep();
          }, 1000);
        }}
      >
        {({ values, errors, isSubmitting, dirty, isValid }) => (
          <Paper className={classes.paper} elevation={2}>
            <Typography variant="h4" color="secondary">
              Signature
            </Typography>
            <Form>
              <div className={classes.spacer}>
                <MyCheckbox
                  name="agreeTerms"
                  label="I agree to the Terms and Conditions"
                  required
                  customStyle={{ width: '100%' }}
                />
              </div>

              <div className={classes.spacer}>
              <div className={classes.spacer}>
                <MyCheckbox
                  name="agreeSignature"
                  label="I agree to the Electronic Signature"
                  required
                  customStyle={{ width: '100%' }}
                />
              </div>
              </div>

              <div className={classes.spacer}>
                <MyTextField
                  name="signature"
                  label="Electronic Signature"
                  required
                  customStyle={{ width: '100%' }}
                />
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
                Review Application
              </Button>

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

export default FormUserName;
