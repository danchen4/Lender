import React from 'react';
// Material UI
import { MyTextField } from '../../../UI/FormikMUI/fkmui-textfield-outline/fkmui-textfield-outline';
import { Typography } from '@material-ui/core';
import { Spacer } from '../../../UI/CustomUI/Spacer/Spacer';
import { FlexBox } from '../../../UI/CustomUI/Flexbox/Flexbox';
// Components
import MySelectStates from '../../../UI/FormikMUI/fkmui-select-states/fkmui-select-states';
import MySelect from '../../../UI/FormikMUI/fkmui-select/fkmui-select';
import WeeklyPayFrequency from '../MUI/WeeklyPayFrequency';
import BiweeklyPayFrequency from '../MUI/BiweeklyPayFrequency';
import SemiMonthlyPayFrequency from '../MUI/SemiMonthlyPayFrequency';
import MonthlyPayFrequency from '../MUI/MonthlyPayFrequency';
// Misc.
import { PAY_FREQUENCY_SELECT } from '../constants';

const AddEmployerIncomeForm = (props) => {
  return (
    <React.Fragment>
      <Spacer>
        <MyTextField
          name="employerName"
          label="Employer Name"
          required
          customStyle={{ width: 100 }}
        />
      </Spacer>
      <Spacer>
        <MyTextField
          name="address1"
          label="Employer Address 1"
          required
          customStyle={{ width: 100 }}
        />
      </Spacer>
      <Spacer>
        <MyTextField name="address2" label="Employer Address 2" customStyle={{ width: 100 }} />
      </Spacer>

      <Spacer>
        <FlexBox justify="space-between">
          <MyTextField name="city" label="City" required customStyle={{ width: 50 }} />
          <MySelectStates name="state" label="State" required customStyle={{ width: 20 }} />
          <MyTextField name="zip" label="ZIP Code" required customStyle={{ width: 25 }} />
        </FlexBox>
      </Spacer>

      <Typography variant="h4" color="secondary">
        Employment Income Information
      </Typography>

      <Spacer>
        <FlexBox justify="space-between">
          <MySelect
            name="payFrequency"
            label="Pay Frequency"
            options={PAY_FREQUENCY_SELECT}
            required
            customStyle={{ width: 45 }}
          />
          <MyTextField
            name="grossIncome"
            label="Gross Income Per Period"
            required
            customStyle={{ width: 45 }}
          />
        </FlexBox>
      </Spacer>

      {props.values.payFrequency === 'Weekly' ? <WeeklyPayFrequency {...props} /> : null}
      {props.values.payFrequency === 'Bi-Weekly' ? <BiweeklyPayFrequency {...props} /> : null}
      {props.values.payFrequency === 'Semi-Monthly' ? <SemiMonthlyPayFrequency {...props} /> : null}
      {props.values.payFrequency === 'Monthly' ? <MonthlyPayFrequency {...props} /> : null}
    </React.Fragment>
  );
};

export default AddEmployerIncomeForm;
