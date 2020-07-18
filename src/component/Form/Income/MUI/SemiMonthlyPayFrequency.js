import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MySelect from '../../../UI/FormikMUI/fkmui-select/fkmui-select';

const useStyles = makeStyles((theme) => ({
  spacer: {
    margin: '24px 0',
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const SEMIMONTHLY_DATE1_SELECT = [...Array(15).keys()].map((item) => ({
  id: item++,
  value: item++,
}));
const SEMIMONTHLY_DATE2_SELECT = [...Array(16).keys()].map((item) => ({
  id: item++ + 15,
  value: item++ + 15,
}));

export const SemiMonthlyPayFrequency = () => {
  const classes = useStyles();

  return (
    <div className={`${classes.spacer} ${classes.flex}`}>
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
    </div>
  );
};
