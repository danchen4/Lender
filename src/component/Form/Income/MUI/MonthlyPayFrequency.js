import React from 'react';
import MySelect from '../../../UI/FormikMUI/fkmui-select/fkmui-select';

const MONTHLY_DATE_SELECT = [...Array(31).keys()].map((item) => ({ id: item++, value: item++ }));

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
