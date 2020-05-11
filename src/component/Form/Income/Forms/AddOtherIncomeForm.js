import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import MyTextField from '../../../UI/FormikMUI/fkmui-textfield-outline/fkmui-textfield-outline';
import MySelect from '../../../UI/FormikMUI/fkmui-select/fkmui-select';

import WeeklyPayFrequency from '../MUI/WeeklyPayFrequency';
import BiweeklyPayFrequency from '../MUI/BiweeklyPayFrequency';
import SemiMonthlyPayFrequency from '../MUI/SemiMonthlyPayFrequency';
import MonthlyPayFrequency from '../MUI/MonthlyPayFrequency';

const useStyles = makeStyles((theme) => ({
  spacer: {
    margin: '24px 0',
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  select: {
    width: (customStyle) => customStyle.width || null,
    textAlign: 'left',
  },
  valueDisplay: {
    marginTop: '40px',
    width: '500px',
    margin: 'auto',
    textAlign: 'left',
  },
}));

const payFrequencySelect = [
  { id: 'weekly', value: 'Weekly' },
  { id: 'biweekly', value: 'Bi-Weekly' },
  { id: 'semimonthly', value: 'Semi-Monthly' },
  { id: 'monthly', value: 'Monthly' },
];

const otherIncomeSelect = [
  { id: 'ss', value: 'Social Security' },
  { id: 'pension', value: 'Pension' },
  { id: 'disability', value: 'Disability' },
  { id: 'other', value: 'Other' },
];

const AddOtherIncomeForm = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <h4>Other Income Information</h4>

      <MySelect
        name="otherIncomeName"
        label="Other Income Type"
        options={otherIncomeSelect}
        required
        customStyle={{ width: '100%' }}
      />

      <div className={`${classes.spacer} ${classes.flex}`}>
        <MySelect
          name="payFrequency"
          label="Pay Frequency"
          options={payFrequencySelect}
          required
          customStyle={{ width: '45%' }}
        />
        <MyTextField
          name="grossIncome"
          label="Gross Income Per Period"
          required
          customStyle={{ width: '45%' }}
        />
      </div>

      {props.values.payFrequency === 'Weekly' ? <WeeklyPayFrequency {...props} /> : null}
      {props.values.payFrequency === 'Bi-Weekly' ? <BiweeklyPayFrequency {...props} /> : null}
      {props.values.payFrequency === 'Semi-Monthly' ? <SemiMonthlyPayFrequency {...props} /> : null}
      {props.values.payFrequency === 'Monthly' ? <MonthlyPayFrequency {...props} /> : null}
    </React.Fragment>
  );
};

export default AddOtherIncomeForm;
