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

const semiMonthlyDate1Select = [...Array(15).keys()].map((item) => ({ id: item++, value: item++ }));
const semiMonthlyDate2Select = [...Array(16).keys()].map((item) => ({
  id: item++ + 15,
  value: item++ + 15,
}));

const SemiMonthlyPayFrequency = () => {
  const classes = useStyles();

  return (
    <div className={`${classes.spacer} ${classes.flex}`}>
      <MySelect
        name="semiMonthlyDate1"
        label="1st Pay Date"
        options={semiMonthlyDate1Select}
        required
        customStyle={{ width: 45 }}
      />
      <MySelect
        name="semiMonthlyDate2"
        label="2nd Pay Date"
        options={semiMonthlyDate2Select}
        required
        customStyle={{ width: 45 }}
      />
    </div>
  );
};

export default SemiMonthlyPayFrequency;
