import React, { useState } from 'react';
// Formik/Yup
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
// Material UI
import { Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import { customTheme } from '../../../../theme/theme';
// Components
import AddEmployerIncomeForm from './AddEmployerIncomeForm';
import AddOtherIncomeForm from './AddOtherIncomeForm';
// Misc.
import setIncomeDataObject from '../helper/setIncomeDataUtility';
import { Spacer } from '../../../UI/CustomUI/Spacer/Spacer';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '1rem',
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
  button2: {
    width: '35%',
    fontSize: '14px',
    backgroundColor: customTheme.palette.primary.dark,
  },
  valueDisplay: {
    marginTop: '40px',
    width: '500px',
    margin: 'auto',
    textAlign: 'left',
  },
}));

const validationSchema = Yup.object({
  incomeSource: Yup.string().required(),
  employerName: Yup.string().when('incomeSource', {
    is: 'Employment',
    then: Yup.string().required(),
    otherwise: Yup.string(),
  }),
  address1: Yup.string().when('incomeSource', {
    is: 'Employment',
    then: Yup.string().max(30).required(),
    otherwise: Yup.string(),
  }),
  address2: Yup.string().max(30),
  city: Yup.string().when('incomeSource', {
    is: 'Employment',
    then: Yup.string().required(),
    otherwise: Yup.string(),
  }),
  state: Yup.string().when('incomeSource', {
    is: 'Employment',
    then: Yup.string().required(),
    otherwise: Yup.string(),
  }),
  zip: Yup.number().when('incomeSource', {
    is: 'Employment',
    then: Yup.number('Zip code must be a number').required(),
    otherwise: Yup.number(),
  }),
  otherIncomeName: Yup.string().when('incomeSource', {
    is: 'Other',
    then: Yup.string().required(),
    otherwise: Yup.string(),
  }),
  payFrequency: Yup.string().required(),
  grossIncome: Yup.number().min(1).max(99999).required(),
  nextPayDate: Yup.date().when('payFrequency', {
    is: 'Bi-Weekly',
    then: Yup.date().required(),
    otherwise: Yup.date(),
  }),
  weeklyPayDate: Yup.string().when('payFrequency', {
    is: 'Weekly',
    then: Yup.string().required(),
    otherwise: Yup.string(),
  }),
  monthlyPayDate: Yup.number().when('payFrequency', {
    is: 'Monthly',
    then: Yup.number().required(),
    otherwise: Yup.number(),
  }),
  semiMonthlyDate1: Yup.number().when('payFrequency', {
    is: 'Semi-Monthly',
    then: Yup.number().required(),
    otherwise: Yup.number(),
  }),
  semiMonthlyDate2: Yup.number().when('payFrequency', {
    is: 'Semi-Monthly',
    then: Yup.number().required(),
    otherwise: Yup.number(),
  }),
});

const EditIncomeSourceForm = ({ updateIncomeData, editIncomeData, values, index }) => {
  const classes = useStyles();
  const [showForm, setShowForm] = useState(true);

  const initialValues = {
    incomeSource: values[index].source.value,
    employerName: values[index].employerData.employerName.value,
    address1: values[index].employerData.address1.value,
    address2: values[index].employerData.address2.value,
    city: values[index].employerData.city.value,
    state: values[index].employerData.state.value,
    zip: values[index].employerData.zip.value,
    otherIncomeName: values[index].otherIncomeName.value,
    grossIncome: values[index].incomeData.grossIncome.value,
    payFrequency: values[index].incomeData.payFrequency.value,
    nextPayDate: values[index].incomeData.nextPayDate.value,
    weeklyPayDate: values[index].incomeData.weeklyPayDate.value,
    monthlyPayDate: values[index].incomeData.monthlyPayDate.value,
    semiMonthlyDate1: values[index].incomeData.semiMonthlyDate1.value,
    semiMonthlyDate2: values[index].incomeData.semiMonthlyDate2.value,
  };

  const hideForm = () => {
    setShowForm(false);
  };

  const submitHandler = async (values, actions) => {
    actions.setSubmitting(true);
    const incomeInputValues = setIncomeDataObject(values);
    await updateIncomeData(incomeInputValues); //need  await or else toggleForm() will unmount before state is updated
    actions.setSubmitting(false);
    actions.resetForm();
    hideForm();
  };

  let form = '';
  if (showForm) {
    form = (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          submitHandler(values, actions);
        }}
      >
        {(props) => (
          <Form>
            {values[index].source.value === 'Employment' && <AddEmployerIncomeForm {...props} />}
            {values[index].source.value === 'Other' && <AddOtherIncomeForm {...props} />}

            <Spacer>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                className={classes.button}
                onClick={(event) => {
                  props.setFieldValue('incomeSource', '');
                  editIncomeData(index, false);
                }}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                color="secondary"
                size="large"
                type="submit"
                startIcon={<SaveIcon />}
                disabled={!props.dirty || !props.isValid || props.isSubmitting}
              >
                Save
              </Button>
            </Spacer>

            <pre className={classes.valueDisplay}>{JSON.stringify(props.values, null, 4)}</pre>
            <pre className={classes.valueDisplay}>{JSON.stringify(props.errors, null, 4)}</pre>
          </Form>
        )}
      </Formik>
    );
  }

  return (
    <React.Fragment>
      <div className={classes.root}>{form}</div>
    </React.Fragment>
  );
};

export default EditIncomeSourceForm;
