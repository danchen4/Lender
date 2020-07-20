import React from 'react';
// Redux
import { useSelector } from 'react-redux';
// FormikYup
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
// MaterialUI
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftOutlinedIcon from '@material-ui/icons/KeyboardArrowLeftOutlined';
// Components
import { MyTextField } from '../../UI/FormikMUI/fkmui-textfield-outline/fkmui-textfield-outline';
import { MyCheckBox } from '../../UI/FormikMUI/fkmui-checkbox/fkmui-checkbox';
import { FormikData } from '../../../helper/FormikData';
import { Spacer, ScFlexBox, ScCard, ScHeader, ScTextBox, ScButton } from '../../UI/Styled';

const initialValues = {
  agreeCertify: false,
  agreeTerms: false,
  signature: '',
};

const LABEL_CERTIFY =
  'I hereby certify that the application information provided is true and correct to the best of my knowledge';

const LABEL_TERMS =
  'I agree to the Terms and Conditions, and the Consumer Consent to the Use of Electronic Transactions';

const FormUserName = ({ pathNext, pathPrev, history }) => {
  const personalDataREDUX = useSelector((state) => state.application.personalData);
  let firstName, lastName;

  const sessionPersonalData = sessionStorage.getItem('sessionPersonalData');
  const parsedData = JSON.parse(sessionPersonalData);

  if (parsedData && !personalDataREDUX.phone.value) {
    firstName = parsedData.firstName;
    lastName = parsedData.lastName;
  } else {
    firstName = personalDataREDUX.firstName.value;
    lastName = personalDataREDUX.lastName.value;
  }
  console.log({ firstName, lastName });

  const validationSchema = Yup.object({
    agreeCertify: Yup.boolean().oneOf([true], 'Must accept Terms and Conditions').required(),
    agreeTerms: Yup.boolean().oneOf([true], 'Must agree to electronic signature').required(),
    signature: Yup.string()
      .trim()
      .oneOf(
        [`${firstName} ${lastName}`],
        'Name on Signature must match exactly first and last name on application'
      )
      .required(),
  });

  const nextStep = () => {
    console.log('<FormSignature /> next steps');
    history.push({ pathname: pathNext });
  };

  const prevStep = () => {
    history.push({ pathname: pathPrev });
  };

  const submitHandler = (values, actions) => {
    actions.resetForm();
    nextStep();
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          submitHandler(values, actions);
        }}
      >
        {({ values, errors, isSubmitting, dirty, isValid }) => (
          <ScCard width={50} shadow="SmoothXs">
            <Spacer margin={3}>
              <ScHeader as="h2" fontSize={3} fontWeight={500} color="secondary" mBot={1} mTop={2}>
                Signature
              </ScHeader>
              <ScTextBox>
                Please review our application policies below. When you're ready, sign and submit
                your application
              </ScTextBox>
            </Spacer>
            <Form>
              <Spacer>
                <MyCheckBox
                  name="agreeCertify"
                  label={LABEL_CERTIFY}
                  required
                  customStyle={{ width: 100 }}
                />
              </Spacer>
              <Spacer>
                <MyCheckBox
                  name="agreeTerms"
                  label={LABEL_TERMS}
                  required
                  customStyle={{ width: 100 }}
                />
              </Spacer>
              <Spacer>
                <MyTextField
                  name="signature"
                  label="Signature"
                  required
                  customStyle={{ width: 100 }}
                />
              </Spacer>

              <Spacer mTop={5}>
                <ScFlexBox justify="space-between">
                  <ScButton variant="secondary" width="45%" onClick={prevStep}>
                    <KeyboardArrowLeftOutlinedIcon />
                    Back
                  </ScButton>
                  <ScButton
                    variant="secondary"
                    width="45%"
                    type="submit"
                    disabled={!dirty || !isValid}
                  >
                    Review
                    <KeyboardArrowRightIcon />
                  </ScButton>
                </ScFlexBox>
              </Spacer>

              <FormikData
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
    </>
  );
};

export default FormUserName;
