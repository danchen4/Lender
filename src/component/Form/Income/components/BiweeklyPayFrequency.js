import React from 'react';
import MyCalender from '../../../UI/FormikMUI/fkmui-calender/fkmui-calender';

export const BiweeklyPayFrequency = () => {
  return (
    <React.Fragment>
      <MyCalender name="nextPayDate" label="Next Pay Date" required customStyle={{ width: 100 }} />
    </React.Fragment>
  );
};
