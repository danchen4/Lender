import React from 'react';
import { MySelect } from '../../../UI/FormikMUI';
import { MONTHLY_DATE_SELECT } from '../../../../constants';

export const MonthlyPayFrequency = (props) => {
  return (
    <React.Fragment>
      <MySelect
        name="monthlyPayDate"
        label="Day of Month"
        options={MONTHLY_DATE_SELECT}
        required
        customStyle={{ width: 100 }}
      />
    </React.Fragment>
  );
};
