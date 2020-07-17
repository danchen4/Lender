import React, { useState, useEffect } from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import * as actionApp from '../../../store/actions';
// MaterialUi
import { Button, Typography, Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { customTheme } from '../../../theme/theme';
// Formik/Yup
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
// Components
import { MyTextField } from '../../UI/FormikMUI/fkmui-textfield-outline/fkmui-textfield-outline';
import MyMaskedTextField from '../../UI/FormikMUI/fkmui-textfield-masked/fkmui-textfield-masked';
import { Spacer } from '../../UI/CustomUI/Spacer/Spacer';
import { FlexBox } from '../../UI/CustomUI/Flexbox/Flexbox';
import MySelectStates from '../../UI/FormikMUI/fkmui-select-states/fkmui-select-states';
import { FormikData } from '../../../helper/FormikData';

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
  button: {
    margin: '1rem',
    padding: '1rem 3rem',
    backgroundColor: customTheme.palette.primary.dark,
  },
  valueDisplay: {
    marginTop: '40px',
    width: '500px',
    margin: 'auto',
    textAlign: 'left',
  },
}));

const PHONE_NUMBER_MASK = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
const DELIMITER = '-';

const validationSchema = Yup.object({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  address1: Yup.string().required().max(30),
  address2: Yup.string().max(30),
  city: Yup.string().required(),
  state: Yup.string().required(),
  zip: Yup.number('Zip code must be a number').required(),
  phone: Yup.string()
    .matches(/(^[0-9]+$)/, 'Please enter valid phone number')
    .required(),
});

const FIELD_VALUES = {
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
  phone: '',
};

const FormUserName = ({ pathNext, history }) => {
  console.log('<FormPersonal /> RENDER');
  const [firstTime, setFirstTime] = useState(true);
  const classes = useStyles();
  const dispatch = useDispatch();
  const personalDataREDUX = useSelector((state) => state.application.personalData);

  let sessionPersonalData = sessionStorage.getItem('sessionPersonalData');
  let parsedData = JSON.parse(sessionPersonalData);
  // After filling out the form and moving to the next step, if you hit the 'Back' button then dirty will be false (since initialValue and Value will be the same)
  // which will make the 'Next Step' button disabled
  // Check to see if there is a value for phone number that was stored in Redux state on submission.
  // Also check to see if values were retried from session storage (which is stored upon submission)
  // If there is, then this is not the first time visiting the page and dont' disable the 'Next Step' button.
  useEffect(() => {
    if (personalDataREDUX.phone.value || sessionPersonalData) setFirstTime(false);
  }, [personalDataREDUX, sessionPersonalData]);

  // if session stoarge has data then load as initial value
  const initialValues = parsedData ? parsedData : FIELD_VALUES;

  const submitHandler = (values, actions) => {
    dispatch(actionApp.setPersonalData(values));
    sessionStorage.setItem('sessionPersonalData', JSON.stringify(values));
    actions.setSubmitting(false);
    actions.resetForm();
    history.push({ pathname: pathNext });
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
        {({ initialValues, values, errors, dirty, isSubmitting, isValid }) => (
          <Box compoenent="div" className={classes.box}>
            <Paper className={classes.paper} elevation={2}>
              <Spacer margin={3}>
                <Typography variant="h2" color="secondary">
                  Personal Information
                </Typography>
              </Spacer>
              <Form>
                <Spacer>
                  <MyTextField
                    name="firstName"
                    label="First Name"
                    required
                    customStyle={{ width: 100 }}
                  />
                </Spacer>
                <Spacer>
                  <MyTextField
                    name="lastName"
                    label="Last Name"
                    required
                    customStyle={{ width: 100 }}
                  />
                </Spacer>
                <Spacer>
                  <MyTextField
                    name="address1"
                    label="Address 1"
                    required
                    customStyle={{ width: 100 }}
                  />
                </Spacer>
                <Spacer>
                  <MyTextField name="address2" label="Address 2" customStyle={{ width: 100 }} />
                </Spacer>
                <Spacer>
                  <FlexBox justify="space-between">
                    <MyTextField name="city" label="City" required customStyle={{ width: 50 }} />
                    <MySelectStates
                      name="state"
                      label="State"
                      required
                      customStyle={{ width: 20 }}
                    />
                    <MyTextField name="zip" label="ZIP Code" required customStyle={{ width: 25 }} />
                  </FlexBox>
                </Spacer>
                <Spacer>
                  <MyMaskedTextField
                    name="phone"
                    label="Phone Number"
                    maskInput={PHONE_NUMBER_MASK}
                    delimiter={DELIMITER}
                    required
                    customStyle={{ width: 100 }}
                  />
                </Spacer>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  type="submit"
                  className={classes.button}
                  disabled={(!dirty && firstTime) || !isValid}
                >
                  Next Step
                </Button>

                <FormikData
                  show
                  firstTime={firstTime}
                  dirty={dirty}
                  isValid={isValid}
                  isSubmitting={isSubmitting}
                  values={values}
                  errors={errors}
                />
              </Form>
            </Paper>
          </Box>
        )}
      </Formik>
    </div>
  );
};

export default FormUserName;
