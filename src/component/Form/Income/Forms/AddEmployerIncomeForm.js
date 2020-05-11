import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import MyTextField from '../../../UI/FormikMUI/fkmui-textfield-outline/fkmui-textfield-outline';
import MySelectStates from '../../../UI/FormikMUI/fkmui-select-states/fkmui-select-states';
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

const AddEmployerIncomeForm = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.spacer}>
        <MyTextField
          name="employerName"
          label="Employer Name"
          required
          customStyle={{ width: '100%' }}
        />
      </div>

      <div className={classes.spacer}>
        <MyTextField
          name="address1"
          label="Employer Address 1"
          required
          customStyle={{ width: '100%' }}
        />
      </div>

      <div className={classes.spacer}>
        <MyTextField name="address2" label="Employer Address 2" customStyle={{ width: '100%' }} />
      </div>

      <div className={`${classes.spacer} ${classes.flex}`}>
        <MyTextField name="city" label="City" required customStyle={{ width: '50%' }} />
        <MySelectStates name="state" label="State" required customStyle={{ width: '20%' }} />
        <MyTextField name="zip" label="ZIP Code" required customStyle={{ width: '25%' }} />
      </div>

      <h4>Employment Income Information</h4>
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

export default AddEmployerIncomeForm;
