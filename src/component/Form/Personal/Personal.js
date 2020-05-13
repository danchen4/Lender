import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actionApp from '../../../store/actions/index';

import { Button, Typography, Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { customTheme } from '../../../theme';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import MyTextField from '../../UI/FormikMUI/fkmui-textfield-outline/fkmui-textfield-outline';
import MyMaskedTextField from '../../UI/FormikMUI/fkmui-textfield-masked/fkmui-textfield-masked';

import useTraceUpdate from '../../../hooks/trace-update';
// import { isArrayEqual } from '../../../utility/deepCompareArray';

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
}));

const phoneNumberMask = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
const delimiter = '-';

const validationSchema = Yup.object({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  phone: Yup.string()
    .matches(/(^[0-9]+$)/, 'Please enter valid phone number')
    .required(),
});

const FormUserName = (props) => {
  console.log('<FormPersonal /> RENDER');
  console.log('<FormPersonal /> match', props.match);
  useTraceUpdate(props);

  console.log(Math.round(Math.random() * 500000));

  const classes = useStyles();
  const { pathNext, history } = props;

  const dispatch = useDispatch();

  const personalDataREDUX = useSelector((state) => state.application.personalData);
  const onSetPersonalData = (userPersonalData) =>
    dispatch(actionApp.setPersonalData(userPersonalData));

  const initialValues = {
    firstName: personalDataREDUX.firstName.value || '',
    lastName: personalDataREDUX.lastName.value || '',
    phone: personalDataREDUX.phone.value || '',
  };

  const nextStep = () => {
    console.log('<FormPersonal /> nextStep');
    history.push({ pathname: pathNext });
  };

  const submitHandler = (values, actions) => {
    actions.setSubmitting(true);
    onSetPersonalData(values);
    actions.setSubmitting(false);
    actions.resetForm();
    nextStep();
  };

  return (
    <div className={classes.root}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          submitHandler(values, actions);
        }}
      >
        {({ values, errors, isSubmitting, dirty, isValid }) => (
          <Box compoenent="div" className={classes.box}>
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

                <pre className={classes.valueDisplay}>{JSON.stringify(props.values, null, 4)}</pre>
                <pre className={classes.valueDisplay}>{JSON.stringify(props.errors, null, 4)}</pre>
              </Form>
            </Paper>
          </Box>
        )}
      </Formik>
    </div>
  );
};

// function compareMatch(prevProps, nextProps) {
//   return isArrayEqual(prevProps.match, nextProps.match);
// }

export default FormUserName;
