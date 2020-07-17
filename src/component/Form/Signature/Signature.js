import React from 'react';
// Redux
import { useSelector } from 'react-redux';
// MaterialUI
import { Button, Typography, Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { customTheme } from '../../../theme/theme';
// FormikYup
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
// Components
import { MyTextField } from '../../UI/FormikMUI/fkmui-textfield-outline/fkmui-textfield-outline';
import MyCheckbox from '../../UI/FormikMUI/fkmui-checkbox/fkmui-checkbox';
import { Spacer } from '../../UI/CustomUI/Spacer/Spacer';

const useStyles = makeStyles((theme) => ({
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
    backgroundColor: customTheme.palette.primary.dark,
  },
  valueDisplay: {
    marginTop: '40px',
    width: '500px',
    margin: 'auto',
    textAlign: 'left',
  },
}));

const initialValues = {
  agreeTerms: false,
  agreeSignature: false,
  signature: '',
};

const TERMS_CHECKBOX =
  'I hereby promise, represent and warrant that I am not currently a debtor under any proceeding in bankruptcy and that I have no intention to file a petition for relief under any chapter of the United States Bankruptcy Code.';

const FormUserName = ({ pathNext, pathPrev, history }) => {
  console.log('<Signature /> RENDER');
  const classes = useStyles();
  const personalDataREDUX = useSelector((state) => state.application.personalData);

  const validationSchema = Yup.object({
    agreeTerms: Yup.boolean().oneOf([true], 'Must accept Terms and Conditions').required(),
    agreeSignature: Yup.boolean().oneOf([true], 'Must agree to electronic signature').required(),
    signature: Yup.string()
      .trim()
      .oneOf(
        [`${personalDataREDUX.firstName.value} ${personalDataREDUX.lastName.value}`],
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
    <div className={classes.root}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          submitHandler(values, actions);
        }}
      >
        {({ values, errors, isSubmitting, dirty, isValid }) => (
          <Box component="div" className={classes.box}>
            <Paper className={classes.paper} elevation={2}>
              <Spacer margin={3}>
                <Typography variant="h2" color="secondary">
                  Signature
                </Typography>
              </Spacer>
              <Form>
                <Spacer>
                  <div className={classes.spacer}>
                    <MyCheckbox
                      name="agreeTerms"
                      label="I agree to the Terms and Conditions"
                      required
                      customStyle={{ width: 100 }}
                    />
                  </div>
                </Spacer>
                <Spacer>
                  <MyCheckbox
                    name="agreeSignature"
                    label="I agree to the Electronic Signature"
                    required
                    customStyle={{ width: 100 }}
                  />
                </Spacer>
                <Spacer>
                  <div className={classes.spacer}>
                    <MyTextField
                      name="signature"
                      label="Electronic Signature"
                      required
                      customStyle={{ width: 100 }}
                    />
                  </div>
                </Spacer>
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
                  disabled={!dirty || !isValid}
                >
                  Review Application
                </Button>

                <pre className={classes.valueDisplay}>{JSON.stringify(values, null, 4)}</pre>
                <pre className={classes.valueDisplay}>{JSON.stringify(errors, null, 4)}</pre>
              </Form>
            </Paper>
          </Box>
        )}
      </Formik>
    </div>
  );
};

export default FormUserName;
