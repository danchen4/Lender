import React, { useState } from 'react';
// Redux
import { useDispatch } from 'react-redux';
import * as actionApp from '../../../../store/actions';
// FormikYup
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
// MaterialUI
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
// Components
import { AddEmployerIncomeForm } from './AddEmployerIncomeForm';
import { AddOtherIncomeForm } from './AddOtherIncomeForm';
import { SelectIncomeSource } from '../components/SelectIncomeSource';
import { Spacer, ScButton, ScFlexBox } from '../../../UI/Styled';
// Misc.
import setIncomeDataObject from '../helper/setIncomeDataUtility';
import { FormikData } from '../../../../helper/FormikData';

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

const initialValues = {
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

export const AddIncomeSourceForm = ({ showForm, toggleForm }) => {
  const [incomeType, setIncomeType] = useState('');
  const dispatch = useDispatch();

  const submitHandler = async (values, actions) => {
    const incomeInputValues = setIncomeDataObject(values);
    await dispatch(actionApp.addIncomeArray(incomeInputValues));
    actions.setSubmitting(false);
    actions.resetForm();
    toggleForm();
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
            <Spacer>
              <SelectIncomeSource
                {...props}
                setIncomeType={setIncomeType}
                customStyle={{ width: 100 }}
              />
            </Spacer>

            {incomeType === 'Employment' && <AddEmployerIncomeForm {...props} />}
            {incomeType === 'Other' && <AddOtherIncomeForm {...props} />}

            <Spacer>
              <ScFlexBox justify="space-evenly">
                <ScButton
                  variant="outlined"
                  variantColor="error"
                  width="35%"
                  padding="1rem 2rem"
                  onClick={() => {
                    setIncomeType('');
                    props.setFieldValue('incomeSource', '');
                    toggleForm();
                  }}
                >
                  <span className="text">Cancel</span>
                  <CancelIcon />
                </ScButton>
                <ScButton
                  variant="outlined"
                  variantColor="primary"
                  width="35%"
                  padding="1rem 2rem"
                  type="submit"
                  disabled={!props.dirty || !props.isValid || props.isSubmitting}
                >
                  <span className="text">Save</span>
                  <SaveIcon />
                </ScButton>
              </ScFlexBox>
            </Spacer>
            <FormikData
              show
              dirty={props.dirty}
              isValid={props.isValid}
              isSubmitting={props.isSubmitting}
              values={props.values}
              errors={props.errors}
            />
          </Form>
        )}
      </Formik>
    );
  }

  return <React.Fragment>{form}</React.Fragment>;
};
