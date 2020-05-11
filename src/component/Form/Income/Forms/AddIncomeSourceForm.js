import React, { useState } from 'react';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import { customTheme } from '../../../../theme';

import AddEmployerIncomeForm from './AddEmployerIncomeForm';
import AddOtherIncomeForm from './AddOtherIncomeForm';

import SelectIncomeSource from '../MUI/SelectIncomeSource';

import setIncomeDataObject from '../setIncomeDataUtility';

const useStyles = makeStyles((theme) => ({
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

const AddIncomeSourceForm = (props) => {
  const classes = useStyles();
  const { showForm, addIncomeData, toggleForm } = props;

  const [incomeType, setIncomeType] = useState('');

  let initialValues = {
    incomeSource: '',
    employerName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    otherIncomeName: '',
    grossIncome: '',
    payFrequency: '',
    nextPayDate: '',
    weeklyPayDate: '',
    monthlyPayDate: '',
    semiMonthlyDate1: '',
    semiMonthlyDate2: '',
  };

  const submitHandler = async (values, actions) => {
    actions.setSubmitting(true);
    const incomeInputValues = setIncomeDataObject(values);
    await addIncomeData(incomeInputValues); //need  await or else toggleForm() will unmount before state is updated
    actions.setSubmitting(false);
    actions.resetForm();
    toggleForm();

    // setTimeout(()=>toggleForm(),100)
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
            <div className={classes.spacer}>
              <SelectIncomeSource
                {...props}
                setIncomeType={setIncomeType}
                customStyle={{ width: '100%' }}
              />
            </div>

            {incomeType === 'Employment' && <AddEmployerIncomeForm {...props} />}
            {incomeType === 'Other' && <AddOtherIncomeForm {...props} />}

            <div className={classes.spacer}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                className={classes.button}
                onClick={(event) => {
                  setIncomeType('');
                  props.setFieldValue('incomeSource', '');
                  toggleForm();
                  // console.log(props.values);
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
            </div>

            <pre className={classes.valueDisplay}>{JSON.stringify(props.values, null, 4)}</pre>
            <pre className={classes.valueDisplay}>{JSON.stringify(props.errors, null, 4)}</pre>
          </Form>
        )}
      </Formik>
    );
  }

  return <React.Fragment>{form}</React.Fragment>;
};

export default AddIncomeSourceForm;
