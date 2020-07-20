import React from 'react';
import MySelect from '../../../UI/FormikMUI/fkmui-select/fkmui-select';
import { WEEKLY_PAYDATE_SELECT } from '../constants';

export const WeeklyPayFrequency = () => {
  return (
    <React.Fragment>
      <MySelect
        name="weeklyPayDate"
        label="Day of Week"
        options={WEEKLY_PAYDATE_SELECT}
        required
        customStyle={{ width: 100 }}
      />
    </React.Fragment>
  );
};

export default WeeklyPayFrequency;
