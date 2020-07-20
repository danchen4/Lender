import React from 'react';
import { MySelect } from '../../../UI/FormikMUI/fkmui-select/fkmui-select';
import { SEMIMONTHLY_DATE1_SELECT, SEMIMONTHLY_DATE2_SELECT } from '../constants';
import { Spacer, ScFlexBox } from '../../../UI/Styled';

export const SemiMonthlyPayFrequency = () => {
  return (
    <Spacer>
      <ScFlexBox justify="space-between">
        <MySelect
          name="semiMonthlyDate1"
          label="1st Pay Date"
          options={SEMIMONTHLY_DATE1_SELECT}
          required
          customStyle={{ width: 45 }}
        />
        <MySelect
          name="semiMonthlyDate2"
          label="2nd Pay Date"
          options={SEMIMONTHLY_DATE2_SELECT}
          required
          customStyle={{ width: 45 }}
        />
      </ScFlexBox>
    </Spacer>
  );
};
