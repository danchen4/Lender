import React from 'react';
// Material UI
import { MyTextField } from '../../../UI/FormikMUI/fkmui-textfield-outline/fkmui-textfield-outline';
import { Typography } from '@material-ui/core';
// Components
import { Spacer } from '../../../UI/Styled/Spacer';
import { FlexBox } from '../../../UI/CustomUI/Flexbox/Flexbox';
import MySelect from '../../../UI/FormikMUI/fkmui-select/fkmui-select';
import { WeeklyPayFrequency } from '../MUI/WeeklyPayFrequency';
import { BiweeklyPayFrequency } from '../MUI/BiweeklyPayFrequency';
import { SemiMonthlyPayFrequency } from '../MUI/SemiMonthlyPayFrequency';
import { MonthlyPayFrequency } from '../MUI/MonthlyPayFrequency';
import { ScTextBox } from '../../../UI/Styled/ScTextBox';
// Misc.
import { PAY_FREQUENCY_SELECT, OTHER_INCOME_SELECT } from '../constants';

export const AddOtherIncomeForm = (props) => {
  return (
    <React.Fragment>
      <Typography variant="h4" color="secondary">
        Other Income Information
      </Typography>
      <ScTextBox>Let us know when you get paid and the gross amount per pay check</ScTextBox>

      <Spacer>
        <MySelect
          name="otherIncomeName"
          label="Other Income Type"
          options={OTHER_INCOME_SELECT}
          required
          customStyle={{ width: 100 }}
        />
      </Spacer>
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
            label="Gross Income"
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
