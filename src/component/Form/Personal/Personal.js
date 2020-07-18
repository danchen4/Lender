import React, { useState, useEffect } from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import * as actionApp from '../../../store/actions';
// MaterialUi
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
// Formik/Yup
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
// Components
import { MyTextField } from '../../UI/FormikMUI/fkmui-textfield-outline/fkmui-textfield-outline';
import MyMaskedTextField from '../../UI/FormikMUI/fkmui-textfield-masked/fkmui-textfield-masked';
import { Spacer } from '../../UI/Styled/Spacer';
import { FlexBox } from '../../UI/CustomUI/Flexbox/Flexbox';
import MySelectStates from '../../UI/FormikMUI/fkmui-select-states/fkmui-select-states';
import { ScCard, ScHeader } from '../../UI/Styled';
import { ScTextBox } from '../../UI/Styled/ScTextBox';
import { ScButton } from '../../UI/Styled/ScButton';
// Misc.
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
    padding: theme.spacing(4),
  },
  button: {
    margin: '1rem',
    padding: '1rem 3rem',
    backgroundColor: theme.palette.primary.dark,
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

  // if session storage has data then load as initial value
  const sessionPersonalData = sessionStorage.getItem('sessionPersonalData');
  const parsedData = JSON.parse(sessionPersonalData);
  const initialValues = parsedData ? parsedData : FIELD_VALUES;

  useEffect(() => {
    // if session storage has data and Redux state is empty (meaning browser was refreshed), retore Redux state with session data
    if (parsedData && !personalDataREDUX.phone.value) {
      dispatch(actionApp.setPersonalData(parsedData));
    }
    // After filling out the form and moving to the next step, if you hit the 'Back' button then dirty will be false (since initialValue and Value will be the same)
    // which will make the 'Next Step' button disabled
    // Check to see if there is a value for phone number that was stored in Redux state on submission.
    // Also check to see if values are in session storage (which is stored upon submission)
    // If there is, then this is not the first time visiting the page and dont' disable the 'Next Step' button.
    if (personalDataREDUX.phone.value || sessionPersonalData) setFirstTime(false);
  }, []);

  // useEffect(() => {
  //   console.log('setFirstTime');
  //   if (personalDataREDUX.phone.value || sessionPersonalData) setFirstTime(false);
  // }, [personalDataREDUX, sessionPersonalData]);

  console.log(personalDataREDUX);

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
          <ScCard width={50} shadow="SmoothXs">
            <ScHeader as="h2" fontSize={3} fontWeight={500} color="secondary" mBot={1} mTop={2}>
              Personal Information
            </ScHeader>
            <ScTextBox>
              At Lender, we take online security seriously. All personal and sensitive data is
              encrypted using 256-bit SSL encryption
            </ScTextBox>
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
                <MyTextField name="city" label="City" required customStyle={{ width: 100 }} />
              </Spacer>
              <Spacer>
                <FlexBox justify="space-between">
                  <MySelectStates name="state" label="State" required customStyle={{ width: 45 }} />
                  <MyTextField name="zip" label="ZIP Code" required customStyle={{ width: 45 }} />
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
              <ScButton
                variant="secondary"
                type="submit"
                disabled={(!dirty && firstTime) || !isValid}
              >
                Next Step
                <KeyboardArrowRightIcon />
              </ScButton>

              <FormikData
                firstTime={firstTime}
                dirty={dirty}
                isValid={isValid}
                isSubmitting={isSubmitting}
                values={values}
                errors={errors}
              />
            </Form>
          </ScCard>
        )}
      </Formik>
    </div>
  );
};

export default FormUserName;
