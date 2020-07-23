import React from 'react';
// Material UI
import { Typography } from '@material-ui/core';
import { Spacer, ScFlexBox } from '../../../UI/Styled';
// Components
import {
  MyTextField,
  MySelectStates,
  MySelect,
  MyMaskedTextFieldCurrency,
} from '../../../UI/FormikMUI';
import {
  WeeklyPayFrequency,
  BiweeklyPayFrequency,
  SemiMonthlyPayFrequency,
  MonthlyPayFrequency,
} from '../components';
import { ScTextBox } from '../../../UI/Styled/ScTextBox';

// Misc.
import { PAY_FREQUENCY_SELECT } from '../../../../constants';

export const AddEmployerIncomeForm = (props) => {
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
        <MyTextField name="city" label="City" required customStyle={{ width: 100 }} />
      </Spacer>
      <Spacer>
        <ScFlexBox justify="space-between">
          <MySelectStates name="state" label="State" required customStyle={{ width: 45 }} />
          <MyTextField name="zip" label="ZIP Code" required customStyle={{ width: 45 }} />
        </ScFlexBox>
      </Spacer>

      <Typography variant="h4" color="secondary">
        Employment Income Information
      </Typography>
      <ScTextBox>Let us know when you get paid and the gross amount per pay check</ScTextBox>

      <Spacer>
        <ScFlexBox justify="space-between">
          <MySelect
            name="payFrequency"
            label="Pay Frequency"
            options={PAY_FREQUENCY_SELECT}
            required
            customStyle={{ width: 45 }}
          />
          <MyMaskedTextFieldCurrency
            name="grossIncome"
            label="Gross Income"
            required
            customStyle={{ width: 45 }}
          />
        </ScFlexBox>
      </Spacer>

      {props.values.payFrequency === 'Weekly' ? <WeeklyPayFrequency {...props} /> : null}
      {props.values.payFrequency === 'Bi-Weekly' ? <BiweeklyPayFrequency {...props} /> : null}
      {props.values.payFrequency === 'Semi-Monthly' ? <SemiMonthlyPayFrequency {...props} /> : null}
      {props.values.payFrequency === 'Monthly' ? <MonthlyPayFrequency {...props} /> : null}
    </React.Fragment>
  );
};
