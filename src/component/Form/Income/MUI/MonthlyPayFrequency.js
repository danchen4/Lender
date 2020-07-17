import React from 'react';
import MySelect from '../../../UI/FormikMUI/fkmui-select/fkmui-select';

const monthlyDateSelect = [...Array(31).keys()].map((item) => ({ id: item++, value: item++ }));

const MonthlyPayFrequency = (props) => {
  return (
    <React.Fragment>
      <MySelect
        name="monthlyPayDate"
        label="Day of Month"
        options={monthlyDateSelect}
        required
        customStyle={{ width: 100 }}
      />
    </React.Fragment>
  );
};

export default MonthlyPayFrequency;
