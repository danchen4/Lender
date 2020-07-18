import React from 'react';
import MySelect from '../../../UI/FormikMUI/fkmui-select/fkmui-select';

const WEEKLY_PAYDATE_SELECT = [
  { id: 'monday', value: 'Monday' },
  { id: 'tuesday', value: 'Tuesday' },
  { id: 'wednesday', value: 'Wednesday' },
  { id: 'thursday', value: 'Thursday' },
  { id: 'friday', value: 'Friday' },
];

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
