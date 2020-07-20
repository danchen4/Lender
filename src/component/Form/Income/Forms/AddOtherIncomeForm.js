import React from 'react';
// Material UI
import { MyTextField } from '../../../UI/FormikMUI/fkmui-textfield-outline/fkmui-textfield-outline';
// Components
import { MySelect } from '../../../UI/FormikMUI/fkmui-select/fkmui-select';
import {
  WeeklyPayFrequency,
  BiweeklyPayFrequency,
  SemiMonthlyPayFrequency,
  MonthlyPayFrequency,
} from '../components';
import { Spacer, ScTextBox, ScHeader, ScFlexBox } from '../../../UI/Styled';
// Misc.
import { PAY_FREQUENCY_SELECT, OTHER_INCOME_SELECT } from '../constants';
import MyMaskedTextFieldCurrency from '../../../UI/FormikMUI/fkmui-textfield-masked-currency/fkmui-textfield-masked-currency';

export const AddOtherIncomeForm = (props) => {
  return (
    <React.Fragment>
      <ScHeader as="h4" fontSize={1.6} fontWeight={500} color="secondary" mTop={1} mBot={0.5}>
        Other Income Information
      </ScHeader>
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
        <ScFlexBox justify="space-between">
          <MySelect
            name="payFrequency"
            label="Pay Frequency"
            options={PAY_FREQUENCY_SELECT}
            required
            customStyle={{ width: 45 }}
          />
          {/* <MyTextField
            name="grossIncome"
            label="Gross Income"
            required
            customStyle={{ width: 45 }}
          /> */}
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
