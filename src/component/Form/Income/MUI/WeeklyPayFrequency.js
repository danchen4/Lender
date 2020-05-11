import React from 'react';
import MySelect from '../../../UI/FormikMUI/fkmui-select/fkmui-select';

const weeklyPayDateSelect = [
  { id: 'monday', value: 'Monday' },
  { id: 'tuesday', value: 'Tuesday' },
  { id: 'wednesday', value: 'Wednesday' },
  { id: 'thursday', value: 'Thursday' },
  { id: 'friday', value: 'Friday' },
];

const WeeklyPayFrequency = () => {
  return (
    <React.Fragment>
      <MySelect
        name="weeklyPayDate"
        label="Day of Week"
        options={weeklyPayDateSelect}
        required
        customStyle={{ width: '100%' }}
      />
    </React.Fragment>
  );
};

export default WeeklyPayFrequency;
